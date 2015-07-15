var NewsBox = React.createClass({
  getInitialState : function () {
    return {data: []};
  },
  componentDidMount: function () {
    $.ajax({
      url: this.props.url,
      dataType:"xml",
      //headers: {'Access-Control-Allow-Origin': '*',
      //          'Access-Control-Allow-Methods': 'GET'},
      crossDomain: false,
      //cache:false,
      success: function(data) {
        stories = [];
        //console.log(data);
        //xml = $.parseXML(data);
        list = $.xml2json(data);
        list.channel.item.forEach( function(ele) {
          //console.log(ele.title);
          stories.push({
            title: ele.title,
            author: ele.author,
            story: ele.description,
            image: ele.content.url,
            link: ele.link
          });
        });
        console.log(stories);
        //list = $(data).find('item')
        //console.log($(list[0]).children('title').text());
        this.setState({data:stories});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div>
        <h1>Top Stories</h1>
        <NewsList data={this.state.data}/>
      </div>
    );
  }
});

var NewsList = React.createClass({
  render: function () {
    var itemNodes = this.props.data.map(function (item){
      return (
        <Item author={item.author}
              title={item.title}
              image={item.image}
              link={item.link}>
          {item.story}
        </Item>
      );
    });
    return (
      <div>
        {itemNodes}
      </div>
    );
  }
});

var Item = React.createClass({
  render: function () {
    var rawMarkup = this.props.children.toString();
    return (
      <div>
        <h2><a href={this.props.link}>{this.props.title}</a></h2>
        <p className="lead">{this.props.author}</p>
        <img src={this.props.image} alt=""/>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
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
  <NewsBox url='feed1.xml' />,
  document.getElementById('content')
);