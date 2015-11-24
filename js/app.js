// container for all news feed elements
var NewsFeed = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function () {
        return {user: "", data: []};
    },
    componentWillMount: function () {
        var ref = new Firebase("https://info343-newsfeed.firebaseio.com/posts");
        this.bindAsArray(ref, "data");
    },
    setUser: function (name) {
        this.setState({user: name});
    },
    render: function () {
        var statusList = this.state.data.map(function (post) {
            return (
                <StatusContainer
                    key={post[".key"]}
                    postKey={post[".key"]}
                    user={post.user} data={post}
                    firebaseRefs={this.firebaseRefs} />
            );
        }.bind(this));
        return (this.state.user) ?
            (
                <div className="newsfeed">
                    <h1>News Feed</h1>
                    <PostStatus user={this.state.user} firebaseRefs={this.firebaseRefs} />
                    {statusList.reverse()}
                </div>
            )
            : <SignIn onSignIn={this.setUser} />;
    }
});


// section for posting a new status
var PostStatus = React.createClass({
    getInitialState: function () {
        return {text: ""};
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    post: function (e) {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text)
            return;
        this.props.firebaseRefs.data.push({
            id: Date.now(),
            user: this.props.user,
            text: text,
            likes: 0,
            comments: []
        });
        this.setState({text: ""});
    },
    render: function () {
        return (
            <div className="postStatus">
                <form className="form-group" onSubmit={this.post}>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="What's on your mind?"
                        value={this.state.text}
                        onChange={this.handleTextChange}/>
                    <input type="submit" className="btn btn-primary" id="postStatusBtn" value="Post" />
                </form>

            </div>
        );
    }
});


// container for each status
var StatusContainer = React.createClass({
    render: function () {
        console.log("key: " + this.props.postKey);
        return (
            <div className="statusContainer">
                <Status data={this.props.data} />
                <CommentContainer
                    postKey={this.props.key}
                    user={this.props.user}
                    data={this.props.data}
                    firebaseRefs={this.props.firebaseRefs}
                />
            </div>
        );
    }
});


// section containing status text
var Status = React.createClass({
    render: function () {
        return (
            <div className="status">
                <h3>{this.props.data.user}</h3>
                <p>{this.props.data.text}</p>
                <button>Like</button>
                <button>Comment</button>
            </div>
        );
    }
});


// container that holds all comments for a particular status
var CommentContainer = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function () {
        var ref = new Firebase("https://info343-newsfeed.firebaseio.com/posts/" + this.props.postKey);
        this.bindAsObject(ref, "post");
    },
    handleCommentSubmit: function (comment) {
        // use this.props.postKey to get post object, then add to comments array
        //this.firebaseRefs.comments.push({
        //    id: Date.now(),
        //    user: this.props.user,
        //    text: comment
        //});
    },
    render: function () {
        return (
            <div className="commentContainer">
                <p>{this.props.data.likes} people like this</p>
                <CommentList comments={this.props.data.comments} />
                <PostComment user={this.props.user} onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});


// list of comments for a status
var CommentList = React.createClass({
    render: function () {
        var comments;
        if (this.props.comments) {
            comments = this.props.comments.map(function (comment) {
                return (
                    <div className="comment" key={comment.id}>
                        <p><span className="commentName">{comment.user}</span> {comment.text}</p>
                    </div>
                );
            });
        }
        return (
            <div className="commentList">
                {comments}
            </div>
        );
    }
});


// section for user to post a comment on a status
var PostComment = React.createClass({
    getInitialState: function () {
        return {text: ""};
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value})
    },
    submit: function (e) {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text)
            return;
        this.props.onCommentSubmit(text);
        this.setState({text: ""});
    },
    render: function () {
        return (
            <div className="postComment">
                <form className="form-group" onSubmit={this.submit}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Write a comment"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <input type="submit" className="btn btn-primary" value="Post" />
                </form>
            </div>
        );
    }
});


// sign in form
var SignIn = React.createClass({
    getInitialState: function () {
        return {name: ""};
    },
    handleTextChange: function (e) {
        this.setState({name: e.target.value});
    },
    signIn: function (e) {
        e.preventDefault();
        var name = this.state.name.trim();
        if (!name)
            return;
        this.props.onSignIn(name);
        this.setState({name: ""});
    },
    render: function () {
        return (
            <div className="signin">
                <form className="form-group" onSubmit={this.signIn}>
                    <h2>Please enter your name</h2>
                    <input
                        type="text"
                        className="form-control"
                        onChange={this.handleTextChange}
                        value={this.state.name} />
                    <input type="submit" className="btn btn-primary" value="Sign In" />
                </form>
            </div>
        );
    }
});


ReactDOM.render(<NewsFeed />, document.getElementById("content"));