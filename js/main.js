var NewsBox = React.createClass({
  render: function () {
    return (
      <div>
        <NewsList />
        <FeedForm />
      </div>
    );
  }
});

var NewsList = React.createClass({
  render: function () {
    return (
      <div>
        Hello, NewsList!
      </div>
    );
  }
});

var FeedForm = React.createClass({
  render: function () {
    return (
      <div>
        Hey FeedForm
      </div>
    );
  }
});

React.render(
  <NewsBox />,
  document.getElementById('content')
);