// container for all news feed elements
var NewsFeed = React.createClass({ // TODO: store user name in this component and pass to children, prompt for name if none set
    render: function () {
        return (
            <div className="newsfeed">
                <h1>News Feed</h1>
                <PostStatus />
                <StatusContainer />
            </div>
        );
    }
});



// section for posting a new status
var PostStatus = React.createClass({
    render: function () {
        return (
            <div className="postStatus">
                <input type="text" placeholder="What's on your mind?" />
                <button className="btn btn-primary">Post</button>
            </div>
        );
    }
});



// container for each status
var StatusContainer = React.createClass({
    render: function () {
        return (
            <div className="statusContainer">
                <Status />
                <CommentContainer />
            </div>
        );
    }
});



// section containing individual status text/image
var Status = React.createClass({
    render: function () {
        return (
            <div className="status">
                <h3>Name</h3>
                <p>Status text</p>
                <img src="" alt="" />
                <button>Like</button>
                <button>Comment</button>
            </div>
        );
    }
});



// container that holds all comments for a particular status
var CommentContainer = React.createClass({
    render: function () {
        return (
            <div className="commentContainer">
                <p>_ people like this</p>
                <CommentList />
                <PostComment />
            </div>
        );
    }
});



// list of comments for a status
var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                <p>Name: comment</p>
                <p>Name: comment</p>
            </div>
        );
    }
});



// section for user to post a comment on a status
var PostComment = React.createClass({
    render: function () {
        return (
            <div className="postComment">
                <input type="text" placeholder="Write a comment" />
                <button className="btn btn-primary">Post</button>
            </div>
        );
    }
});


ReactDOM.render(<NewsFeed />, document.getElementById("content"));