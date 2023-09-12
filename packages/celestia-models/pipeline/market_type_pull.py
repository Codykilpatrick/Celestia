import asyncio
import aiohttp
import asyncpg
import time


async def fetch_history(session, type_id, region_id):
    history_url = f"https://esi.evetech.net/latest/markets/{region_id}/history/?datasource=tranquility&type_id={type_id}"
    try:
        async with session.get(history_url) as response:
            if response.status == 200:
                data = await response.json()
                return type_id, data
            else:
                error_message = f"Request failed with status code {response.status} for type_id {type_id} in {region_id}"
                print(error_message)
                log_failed_request(error_message)  # Log the error to a file
                return type_id, None
    except Exception as e:
        error_message = f"An error occurred for type_id {type_id}: {str(e)} {region_id}"
        print(error_message)
        log_failed_request(error_message)  # Log the error to a file
        return type_id, None


async def fetch_data_for_region(region_id, conn):
    url = f"https://esi.evetech.net/latest/markets/{region_id}/types/?datasource=tranquility"
    exclude_type_ids = [76518, 76519, 76532, 76531, 264, 76527, 76517, 76526, 76528, 502, 76520, 76530, 76524, 76520, 76529, 76521]

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    region_current_types = await response.json()
                else:
                    error_message = f"An error occured getting types from {region_id} with code {response.status}"
                    log_failed_request(error_message)  # Log the error to a file
                    print(f"Request failed with status code {response.status} for region_id {region_id}")
                    return
    except Exception as e:
        error_message = f"An exception occured getting types for region: {region_id} with exception {str(e)}"
        log_failed_request(error_message)  # Log the error to a file
        print(f"An error occurred for region_id {region_id}: {str(e)}")
        return

    filtered_type_ids = [type_id for type_id in region_current_types if type_id not in exclude_type_ids]
    tasks = []
    total_items = len(filtered_type_ids)
    processed_items = 0

    async with aiohttp.ClientSession() as session:  # Create a new session
        for type_id in filtered_type_ids:
            task = asyncio.ensure_future(fetch_history(session, type_id, region_id))
            tasks.append(task)

        for future in asyncio.as_completed(tasks):
            type_id, data = await future
            print("TYPE_ID", type_id)
            processed_items += 1
            progress = (processed_items / total_items) * 100
            print(f"Fetched data for type_id {type_id}")
            print(f"{progress:.2f}% done")

            if data is not None:
                for row in data:
                    await conn.execute(
                        "INSERT INTO celestia_public.market_history_pull (type_id, date, average, highest, lowest, order_count, volume, region_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                        type_id,
                        row['date'],
                        row['average'],
                        row['highest'],
                        row['lowest'],
                        row['order_count'],
                        row['volume'],
                        region_id
                    )


def log_failed_request(error_message):
    with open("failed_requests.txt", "a") as file:
        file.write(error_message + "\n")


async def main():
    start_time = time.time()
    database_url = "postgresql://postgres:password@localhost/celestia"
    conn = await asyncpg.connect(database_url)
    region_ids = [10000043, 10000002, 10000030, 10000032, 10000042]

    for region_id in region_ids:
        await fetch_data_for_region(region_id, conn)

    await conn.close()

    end_time = time.time()  # Record the end time
    elapsed_time = end_time - start_time  # Calculate the elapsed time
    print(f"Total time taken: {elapsed_time} seconds")

if __name__ == "__main__":
    asyncio.run(main())
