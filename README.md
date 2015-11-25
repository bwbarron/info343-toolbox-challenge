#News Feed

This barebones implementation of Facebook's news feed uses [React](https://facebook.github.io/react/), a very comprehensive framework used to build user interfaces.

While the code may look complex for such a simple app, React is optimized for the reusability of code, making it much easier to design large, complex application interfaces. React acts as an abstraction from the DOM, and once you wrap your head around the unidirectional data flow nature, it makes for a better programming experience.

If, as a developer, you prefer to work with two-way data binding, React isn't the library for you. While there are many arguments against the pattern of bidirectional data binding, it can certainly be useful depending on how you want to model state in your application.

##Using this app

This example app uses React to create all of the UI components, as well as to transmit necessary data between components. It uses Firebase on the backend to store all the data. Firebase created a mixin for React called [ReactFire](https://www.firebase.com/docs/web/libraries/react/), which is used to bind React component state with the database.

[Here is a hosted version of the app](http://students.washington.edu/bbarron/info343/info343-toolbox-challenge/)

If you want to run it locally, you simply need a web server to run it on in order to communicate with Firebase.

##Resources

* [Outline explaining how to approach building a web app with React](https://facebook.github.io/react/docs/thinking-in-react.html)
* [React Documentation](https://facebook.github.io/react/docs/top-level-api.html)
* [Here's a helpful tutorial](https://facebook.github.io/react/docs/tutorial.html)