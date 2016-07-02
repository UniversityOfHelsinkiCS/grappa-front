import React, { Component } from "react";

export default class Dropdown extends Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      menuActive: false,
      data: [
        {
          id: 1,
          name: "Matti Luukkainen",
          title: "AssProf",
          active: false,
          filtered: false,
        },
        {
          id: 2,
          name: "Arto Vihavainen",
          title: "Doc",
          active: false,
          filtered: false,
        },
        {
          id: 3,
          name: "Linus Torvalds",
          title: "Other",
          active: false,
          filtered: false,
        },
        {
          id: 4,
          name: "Arto Wikla",
          title: "Prof",
          active: false,
          filtered: false,
        },
      ]
    };
  }

  componentWillMount() {
    this.setState({
      data: this.props.Graders || [],
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.Graders || [],
    });
  }

  handleClick(type, index, event) {
    if (type === "unactivate") {
      this.state.data[index].active = false;
      this.setState({});
    } else if (type === "activate") {
      this.state.data[index].active = true;
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
      const filtered = this.state.data.map(item => {
        if (item.name.toLowerCase().indexOf(value) === -1 && item.title.toLowerCase().indexOf(value) === -1) {
          item.filtered = true;
        } else {
          item.filtered = false;
        }
        return item;
      });
      this.setState({
        searchValue: value,
        data: filtered,
      });
    }
  }

  handleKeyPress(target) {
    // if enter
    if (target.charCode === 13) {
      let found = false;
      const activeOne = this.state.data.map(item => {
        if (!item.active && !item.filtered && !found) {
          item.active = true;
          found = true;
        }
        return item;
      });
      this.setState({
        data: activeOne,
      });
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


  render() {
    const { data } = this.state;
    return (
      <div>
        <div
          className="ui fluid multiple search selection dropdown empty visible"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        >
          <input name="tags" type="hidden" value="asdf" />
          <i className={this.state.menuActive ? "delete icon" : "dropdown icon"} onClick={this.handleClick.bind(this, "toggleMenu")}></i>
          { data.map((item, index) => {
            if (item.active) {
              return (
                  <a key={index} className="ui label transition visible" data-value="angular" onFocus={this.handleFocus.bind(this)}>
                    { `${item.title} ${item.name}` }
                    <i className="delete icon" onClick={this.handleClick.bind(this, "unactivate", index)}></i>
                  </a>
                );
            } else {
              return (
                  <a key={index} onFocus={this.handleFocus.bind(this)}></a>
                );
            }
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
              { data.map((item, index) => {
                if (!item.active && !item.filtered) {
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
