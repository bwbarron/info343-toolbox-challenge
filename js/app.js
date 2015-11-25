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
                    user={this.state.user} data={post} />
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
            likes: 0
        });
        this.setState({text: ""});
    },
    render: function () {
        return (
            <div className="postStatus">
                <div className="postStatusHeader">
                    <span>Update Status</span>
                </div>
                <form className="form-group statusForm" onSubmit={this.post}>
                    <div className="statusTextContainer">
                        <textarea
                            className="form-control statusTextArea"
                            rows="3"
                            placeholder="What's on your mind?"
                            value={this.state.text}
                            onChange={this.handleTextChange}/>
                    </div>
                    <input type="submit" className="btn btn-primary" id="postStatusBtn" value="Post" />
                </form>
            </div>
        );
    }
});


// container for each status
var StatusContainer = React.createClass({
    render: function () {
        return (
            <div className="statusContainer">
                <Status data={this.props.data} postKey={this.props.postKey} />
                <CommentContainer
                    postKey={this.props.postKey}
                    user={this.props.user}
                    data={this.props.data}
                />
            </div>
        );
    }
});


// section containing status text
var Status = React.createClass({
    getInitialState: function () {
        return {liked: false};
    },
    likeStatus: function () {
        var ref = new Firebase("https://info343-newsfeed.firebaseio.com/posts/" + this.props.postKey);
        this.setState({liked: !this.state.liked});
        ref.child("likes").transaction(function (likes) {
            return (this.state.liked) ? --likes : ++likes;
        }.bind(this));
    },
    render: function () {
        return (
            <div className="status">
                <h3>{this.props.data.user}</h3>
                <p>{this.props.data.text}</p>
                <div className="likeBtnArea">
                    <i className="fa fa-thumbs-up" id={this.state.liked ? "liked" : ""}></i><span> </span>
                    <a id={this.state.liked ? "liked" : ""} className="likeBtn" onClick={this.likeStatus}>Like</a>
                </div>

            </div>
        );
    }
});


// container that holds all comments for a particular status
var CommentContainer = React.createClass({
    render: function () {
        var likes = this.props.data.likes;
        return (
            <div className="commentContainer">
                <div className="likeStats">{likes} {(likes === 1) ? "person" : "people"} like this</div>
                <CommentList comments={this.props.data.comments} />
                <PostComment user={this.props.user} data={this.props.data} postKey={this.props.postKey} />
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
                        <p id="comment"><span className="commentName">{comment.user}</span> {comment.text}</p>
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

        // save to firebase
        var ref = new Firebase("https://info343-newsfeed.firebaseio.com/posts/" + this.props.postKey);
        var newComment = {
            id: Date.now(),
            user: this.props.user,
            text: text
        };
        this.props.data.comments ? this.props.data.comments.push(newComment) : this.props.data.comments = [newComment];
        ref.update({comments: this.props.data.comments});
        this.setState({text: ""});
    },
    render: function () {
        return (
            <div className="postComment">
                <form className="form-group commentForm" onSubmit={this.submit}>
                    <input
                        className="form-control commentBox"
                        type="text"
                        placeholder="Write a comment"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
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
                <h2>Please enter your name</h2>
                <form className="form-group signInForm" onSubmit={this.signIn}>
                    <input
                        type="text"
                        id="signIn"
                        className="form-control"
                        onChange={this.handleTextChange}
                        value={this.state.name} />
                    <input type="submit" className="btn btn-primary" id="signInBtn" value="Sign In" />
                </form>
            </div>
        );
    }
});


ReactDOM.render(<NewsFeed />, document.getElementById("content"));