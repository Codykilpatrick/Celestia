import asyncio
import aiohttp
import asyncpg


async def fetch_history(session, type_id):
    history_url = f"https://esi.evetech.net/latest/markets/10000043/history/?datasource=tranquility&type_id={type_id}"
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


async def main():
    # The URL to pull current market item types.
    url = "https://esi.evetech.net/latest/markets/10000043/types/?datasource=tranquility"
    database_url = "postgresql://postgres:password@localhost/celestia"
    conn = await asyncpg.connect(database_url)
    region_id = 10000043

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    region_types = await response.json()
                else:
                    print(f"Request failed with status code {response.status}")
                    return
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return

    tasks = []

    async with aiohttp.ClientSession() as session:  # Create a new session
        for type_id in region_types:
            task = asyncio.ensure_future(fetch_history(session, type_id))
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


    # Close the database connection
    await conn.close()

if __name__ == "__main__":
    asyncio.run(main())
