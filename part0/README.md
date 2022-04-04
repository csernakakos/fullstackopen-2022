## Fullstack Part 0
## 0.4 New note

Answer:
```
note over browser:
browser sends data to server, for example "note-Hello"
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server:
server redirects browser to /notes
end note

server-->browser: /exampleapp/notes

note over browser:
browser gets /notes. /notes includes references to other files (CSS, JS, JSON, ICO).
browser send HTTP GET to get those assets.
end note
browser->server: HTTP GET assets of /notes
server-->browser: /exampleapp/main.css
server-->browser: /exampleapp/main.js
server-->browser: /exampleapp/data.json
server-->browser: /exampleapp/favicon.ico
```

## 0.5 Single page app
```
note over browser:
browser sends HTTP GET request to server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa

note over server:
server responds with HTTP response: 200 OK
server sends /spa HTML to the browser
end note

server-->browser: /spa HTML

note over browser:
browser gets /spa. /spa includes references to other files (CSS, JS, JSON, ICO).
browser send HTTP GET request to get those assets.
end note
browser->server: HTTP GET assets of /spa

note over server:
server responds with HTTP response: 200 OK
server sends assets to the browser
end note
server-->browser: main.css
server-->browser: spa.js
server-->browser: data.json
server-->browser: favicon.ico
```

## 0.6 New note
```
note over browser:
browser submits a new note,
for example "note-Hello",
as a POST request to the server.

browser stays on the same page.
browser-side JavaScript is used to re-render
the notes list.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over server:
server responds with HTTP response: 201 Created
end note
server-->browser: HTTP response: 201 Created
```