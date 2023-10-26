import subprocess

# Run update_market_history.py
update_process = subprocess.Popen(['python', 'pull_daily_market_history.py'])
update_process.wait()

# Run sync_market_history.py
sync_process = subprocess.Popen(['python', 'sync_market_history.py'])
sync_process.wait()
