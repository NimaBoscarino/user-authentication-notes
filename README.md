# W 2 D 4 - User Authentication

NEAT LINK: https://stackshare.io/stacks

REPO: https://github.com/NimaBoscarino/user-authentication-notes

Although you did a bit of cookie learning and implementation recently, a) it was quite basic, and b) it is still deserving of a conversation. That's what this class is all about. We'll hopefully take things a bit further than the basic implementation as well!

HTTP - stateless protocol
  - sort of like sending letters
    - all of the contextual info (who am i? what was I doing?)
  - transactional
    - client makes a request
      - client has to send all the contextual info for the server to read
    - server sends a response

HTTP REQUEST IS MADE UP OF
- METHOD (GET, POST, DELETE)
- PATH (/dogs, /urls/12)
- MIGHT BE A BODY
- url encoded query strings (?hello=world)
- Headers
  - Authorization
  - who is the client? browser type...
  - Cookies

What does "HTTP is stateless" mean? First, what does "state" even mean?

  - State = memory
  - Statelessness in HTTP means that the connection ends between the client and server after the response (and no state (data) needs to be stored on either side).
  - You can think of the server having amnesia (server: _"wait, who are you again? I don't believe we've met."_ you: _"uhhh, seriously server?"_)

##### Pros of a Stateless protocol 

- A lot more simple for the user and the developer to implement
- Works really well (and quickly) for a transactional relationship ("hey, give me x" ==> "ok here you go")
- Every request is independent of the other
- We can handle many concurrent requests (many requests at the same) without complexity

##### Cons of a Stateless protocol 

- Not able to easily keep track of context
- Context has to be provided each time
- Good for transactional but not for long running conversations (real time apps, etc. More on this later in Week 6 when we cover WebSockets!)

### Intro To Cookies

In general, we learned that Cookies:

- Are used to remember information about a "client" (ie browser / user)
- Stored as Key-value pair of data (same `k=v` format as query string in the URL)
- Stored on/by the client (Browser, etc)
- Readable/Writable by the client (eg: `document.cookie`; we didn't talk about it but it is possible, unsurprisingly since we can change cookies via DevTools)
- Readable/Writable by the the server (eg: "Set-Cookie" response header)
- When set on the server, it sends back a `Set-Cookie: ` response header for the browser to then update its cookies
- Each stored cookie is then transmitted by the client to the server with _every_ HTTP request to that _same domain_ (via "Cookie" header)


### Security Problems & Solutions

**Problem 1:** If the connection is over HTTP someone can still sniff out that information over WiFi or other means and then use that encrypted value to impersonate you. They can see what username and password you POST to the server, as well as read the cookies (and other data) being transmitted back and forth. One example of this was done via the popular 

This is called "Session Hijacking" and in this case it would be done via a "~Man~Person in the middle attack".

**Solution:** For this reason, we need to secure the entire communication using SSL encryption at the HTTP level. _Use HTTPS_ basically.

With this the entire HTTP communication (request and response) are fully encrypted. YAY! Problem solved. But we have other security problems ...

**Problem 2:** Using HTTP for all the pages avoids this Person in the middle attack problem. But what about the fact that our cookie is `username=KV`. Anyone can start guessing usernames until one works! You saw me do this where I switched it to `DB` and easily took over Don Burks!

**Solution:** Encrypt (and "sign") the cookies. This will mean that no one can tamper with or understand by that data except our server. Using the `cookie-session` published node module is one way to do this easily (it does it by default!). 

<small>Aside: This has lead to confusion among students in the past thinking that "session cookies are therefore always encrypted cookies". It just so happens that the `cookie-session` module encrypts by default (because it would be crazy not to!). More on session cookies below.</small>

HTTPS + Encrypted cookies are therefore solutions that should be used together, because they work together to solve both problems.

### Session Cookie

We didn't get to talk about this (limited in time, sorry).

Session cookies are nothing special. The only thing different is their expiration. Instead an _expiration date+, they expire when the browser _"feels like it"_.

In the past browser cookies would get cleared when you terminated the browser completely (not just close a tab). But recently Chrome and some other browsers have changed that behaviour.

Basically: when you read "session cookie", just understand that it's still a cookie. Nothing more, nothing less.

### Hashing

**Problem 3:** One other problem we identified is that passwords cannot and should not be stored as clear text. Otherwise it is easier for people with access to the Database (DB) to use those credentials for logging in into that service but also other services (people do reuse passwords.)

We could encrypt the passwords before storing them into our database. However encryption implies that we can still read the original value by decrypting them later. In the case of passwords, we don't _need_ to nor should be _able_ to get the original password again.

**Enter Hashing**

Hashing can be used to solve other class of problems too, but it's also very commonly used for passwords.

We quickly looked at one hashing algorithm/function called `bcrypt`. I believe it's the most popular option for password hashing.

Instead of storing cleartext passwords, we "hash" them which is essentially "one way encryption" (original data is lost and cannot be retrieved and the hashed value is expected to be unique enough such that no other password value will generate the same unique hashed value).

Whenever a user attempts login, we need to re-hash their login attempt's password and compare the hashed value with the one we have stored from before.

### Code

You can check out the code that we wrote in class, in the "step" files.

For some examples made by other instructors, take a look at these below:

You can look at the [language selection demo](https://github.com/jugonzal/lhl-lectures/tree/master/w2d4-cookies/language_selection) for the most basic features of cookies.

Check the [user authentication demo](https://github.com/jugonzal/lhl-lectures/tree/master/w2d4-cookies/user_authentication) for the full code.
That's all for now.

Enjoy,
Nima

(NOTE, based on KV's notes)