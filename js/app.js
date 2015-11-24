// container for all news feed elements
var NewsFeed = React.createClass({ // TODO: store user name in this component and pass to children, prompt for name if none set
    getInitialState: function () {
        return {user: null, data: []};
    },
    loadPosts: function () {
        $.getJSON("data/posts.json").then(function (data) {
            this.setState({data: data});
        }.bind(this));
    },
    render: function () {
        this.loadPosts();
        var statusList = this.state.data.map(function (post) {
            return (
                <StatusContainer key={post.id} user={post.user} data={post} />
            );
        });
        return (
            <div className="newsfeed">
                <h1>News Feed</h1>
                <PostStatus />
                {statusList}
            </div>
        );
    }
});



// section for posting a new status
var PostStatus = React.createClass({
    render: function () {
        return (
            <div className="postStatus">
                <textarea className="form-control" rows="3" placeholder="What's on your mind?" />
                <button className="btn btn-primary" id="postStatusBtn">Post</button>
            </div>
        );
    }
});



// container for each status
var StatusContainer = React.createClass({
    render: function () {
        return (
            <div className="statusContainer">
                <Status data={this.props.data} />
                <CommentContainer user={this.props.user} data={this.props.data} />
            </div>
        );
    }
});



// section containing individual status text/image
var Status = React.createClass({
    render: function () {
        return (
            <div className="status">
                <h3>{this.props.data.user}</h3>
                <p>{this.props.data.text}</p>
                <img src={this.props.data.imgUrl} alt="" />
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
                <p>{this.props.data.likes} people like this</p>
                <CommentList comments={this.props.data.comments} />
                <PostComment user={this.props.user} />
            </div>
        );
    }
});



// list of comments for a status
var CommentList = React.createClass({
    render: function () {
        var comments = this.props.comments.map(function (comment) {
            return (
                <div className="comment" key={comment.id}>
                    <p><span className="commentName">{comment.user}</span> {comment.text}</p>
                </div>
            );
        });
        return (
            <div className="commentList">
                {comments}
            </div>
        );
    }
});



// section for user to post a comment on a status
var PostComment = React.createClass({
    render: function () {
        return (
            <div className="postComment">
                <input className="form-control" type="text" placeholder="Write a comment" />
                <button className="btn btn-primary">Post</button>
            </div>
        );
    }
});


ReactDOM.render(<NewsFeed />, document.getElementById("content"));