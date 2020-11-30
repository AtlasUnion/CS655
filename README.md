# CS655

# worker side

Hey, I uploaded the worker in a separate branch. There's another file I was using just for testing, we can remove it from the final build. Currently, the worker expects a message of the form "{'hash': base64_encoded_hash, 'index': [start_index,end_index]}END". For example, "{'hash': b'/JPSe2O0LRk+fyvduXBZsA==', 'index': [0,250000]}END" looks for a password that hashes to b'/JPSe2O0LRk+fyvduXBZsA==' and will search passwords from index 0 up to but not including 250000. Format was just something arbitrary and can be easily tweaked, just let me know if you have any changes to it. Oh and the END portion is just so I know when the full string was received.

# server side expectation for worker
1. worker should be multi-threaded (otherwise may not be able to handle high volume of request)
2. once a worker finish its job, if find a password, send in format: "password\n", if do not find a passsword, send "Fail to find password\n"
