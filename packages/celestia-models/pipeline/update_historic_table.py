import subprocess

# Run update_market_history.py
update_process = subprocess.Popen(['python', 'update_market_history.py'])
update_process.wait()  # Wait for update_market_history.py to complete

# Run sync_market_history.py
sync_process = subprocess.Popen(['python', 'sync_market_history.py'])
sync_process.wait()  # Wait for sync_market_history.py to complete
