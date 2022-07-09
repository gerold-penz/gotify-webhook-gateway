# Gotify Webhook Gateway/Server

Sends HTTP requests (WebHooks) when Gotify server receives messages.

Gotify webhook gateway is a small server program that can be installed 
with Docker. It connects to your Gotify server via WebSocket and 
REST API and waits until a new message is sent to Gotify. 
This message is now sent to an HTTP server via HTTP request.

For example, you can use it to notify no-code platforms like NodeRed or 
N8N when a new message has been created for a particular Gotify application. 
I use it to automatically add ToDo notes to my Mattermost board (Focalboard). 
After that I automatically delete the message from the Gotify server.
