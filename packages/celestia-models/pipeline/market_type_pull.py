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
                print(f"Request failed with status code {response.status} for type_id {type_id}")
                return type_id, None  # Return None in case of an error
    except Exception as e:
        print(f"An error occurred for type_id {type_id}: {str(e)}")
        return type_id, None  # Return None in case of an error


async def fetch_data_for_region(region_id, conn):
    url = f"https://esi.evetech.net/latest/markets/{region_id}/types/?datasource=tranquility"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    region_types = await response.json()
                else:
                    print(f"Request failed with status code {response.status} for region_id {region_id}")
                    return
    except Exception as e:
        print(f"An error occurred for region_id {region_id}: {str(e)}")
        return

    tasks = []

    async with aiohttp.ClientSession() as session:  # Create a new session
        for type_id in region_types:
            task = asyncio.ensure_future(fetch_history(session, type_id, region_id))
            tasks.append(task)

        # Use an empty dictionary to store results
        results = {}

        for future in asyncio.as_completed(tasks):
            type_id, data = await future
            results[type_id] = data
            print(f"Fetched data for type_id {type_id}")
            print(data)
            if data is not None:
                for row in data:
                    # Check if the row already exists based on type_id and date
                    exists = await conn.fetchval(
                        "SELECT EXISTS (SELECT 1 FROM celestia_public.market_history_pull WHERE type_id = $1 AND date = $2)",
                        type_id,
                        row['date']
                    )

                    if not exists:
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
