import React, { Component } from "react";

export default class Dropdown extends Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      menuActive: false,
      filtered: [],
      // data: [
        // {
        //   id: 1,
        //   name: "Matti Luukkainen",
        //   title: "AssProf",
        //   active: false,
        //   filtered: false,
        // },
        // {
        //   id: 2,
        //   name: "Arto Vihavainen",
        //   title: "Doc",
        //   active: false,
        //   filtered: false,
        // },
        // {
        //   id: 3,
        //   name: "Linus Torvalds",
        //   title: "Other",
        //   active: false,
        //   filtered: false,
        // },
        // {
        //   id: 4,
        //   name: "Arto Wikla",
        //   title: "Prof",
        //   active: false,
        //   filtered: false,
        // },
      // ]
    };
  }

  componentWillMount() {
    console.log("will mount");
    console.log(this.props.graders);
    console.log(this.props.activated);
  }

  componentWillReceiveProps(newProps) {
    console.log("got props");
    console.log(newProps.graders);
  }


  handleClick(type, index, event) {
    if (type === "unactivate" && this.props.editable) {
      this.props.activated.splice(index, 1);
      this.setState({});
    } else if (type === "activate" && this.props.editable) {
      // console.log("pushing grader to activated")
      this.props.activated.push(this.props.graders[index]);
      this.setState({});
    } else if (type === "toggleMenu") {
      this.setState({
        menuActive: !this.state.menuActive,
      });
    }
  }

  handleChange(name, event) {
    if (name === "search") {
      const value = event.target.value;
      const filtered = this.props.graders.map((item, index) => {
        return item.name.toLowerCase().indexOf(value) === -1 &&
          item.title.toLowerCase().indexOf(value) === -1;
      });
      this.setState({
        searchValue: value,
        filtered,
      });
    }
  }

  handleKeyPress(target) {
    // if enter
    if (target.charCode === 13 && this.props.editable) {
      const activated = this.props.graders.find((item, index) => {
        if (!this.state.filtered[index] && !this.isActivated(item)) {
          return item;
        }
      });
      if (activated !== undefined) {
        this.props.activated.push(activated);
        this.setState({});
      }
    }
  }

  handleFocus() {
    this.setState({
      menuActive: true,
    });
  }

  handleBlur() {
    // this.setState({
    //   menuActive: false,
    // });
  }

  isActivated(grader) {
    const index = this.props.activated.findIndex(item => {
      if (grader.id === item.id) return item;
    });
    return index !== -1;
  }

  render() {
    const { graders, activated } = this.props;
    const { filtered } = this.state;
    // console.log("filtered")
    // console.log(filtered)
    // console.log("activated")
    // console.log(activated)
    return (
      <div>
        <div
          className="ui fluid multiple search selection dropdown empty visible"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        >
          <input name="tags" type="hidden" value="asdf" />
          <i className={this.state.menuActive ? "delete icon" : "dropdown icon"} onClick={this.handleClick.bind(this, "toggleMenu")}></i>
          { activated.map((item, index) => {
            return (
              <a key={index} className="ui label transition visible" data-value="angular" onFocus={this.handleFocus.bind(this)}>
                { `${item.title} ${item.name}` }
                <i className="delete icon" onClick={this.handleClick.bind(this, "unactivate", index)}></i>
              </a>
            );
          })
          }
          <input
            className="search"
            autoComplete="off"
            tabIndex="0"
            style={{ width: "100%" }}
            value={this.state.searchValue}
            onChange={this.handleChange.bind(this, "search")}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <span className="sizer">asdf</span>
          <div className="default text filtered">Skills</div>
          { this.state.menuActive ?
            <div className="menu transition visible" tabIndex="-1">
              { graders.map((item, index) => {
                if (!filtered[index] && !this.isActivated(item)) {
                  return (
                    <div
                      key={index}
                      className="item"
                      data-value="css"
                      onClick={this.handleClick.bind(this, "activate", index)}
                    >
                      { `${item.title} ${item.name}` }
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="item filtered" data-value="css">{item.name}</div>
                  );
                }
              })
              }
            </div>
              :
            <div className="menu transition hidden" tabIndex="-1">
            </div>
          }
        </div>
      </div>
    );
  }
}
