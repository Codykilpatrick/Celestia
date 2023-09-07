import requests

# The URL to pull current market item types.
url = "https://esi.evetech.net/latest/markets/10000043/types/?datasource=tranquility"

try:
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response
        region_types = response.json()

        # Print the results
        print(region_types)
    else:
        print(f"Request failed with status code {response.status_code}")
except Exception as e:
    print(f"An error occurred: {str(e)}")

