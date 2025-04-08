import React, { Component } from "react";

import classes from "./my-input.module.less";

class MyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: this.props.focused,
      isPassowrd: this.props.password,
    };
  }

  componentDidMount() { }

  onFocusChange = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.props.focused ? this.setState({ focused: false }) : null;
  };

  render() {
    return (
      <div className={classes.common_kupos_input} style={this.props.style}>
        <div
          className={
            classes.input_outer +
            " flex-row " +
            this.props.className +
            (this.props.error ? " error" : "")
          }
          style={this.props.inputOuterStyle}
        >
          {this.props.icon ? (
            <img className="icon-size icon-left " src={this.props.icon} />
          ) : null}

          <input
            type={
              (!this.props.type && !this.props.password) ||
                this.props.type == "places" ||
                this.props.type == "text"
                ? "text"
                : this.state.isPassowrd
                  ? "password"
                  : this.props.type
            }
            pattern={
              this.props.pattern == "chars" ? "[A-Za-z]" : this.props.pattern
            }
            className={this.props.fontSize ? this.props.fontSize : "font11"}
            placeholder={this.props.placeholder}
            onFocus={event => this.onFocusChange(event.target)}
            value={this.props.value || ""}
            style={
              ([this.props.inputWidth, this.props.height],
                this.props.disabled ? { color: "#919191" } : {})
            }
            onChange={
              this.props.onChange && this.props.type != "places"
                ? event => this.props.onChange(event.target.value)
                : null
            }
            onBlur={
              this.props.onBlur
                ? event => this.props.onBlur(event.target.value)
                : null
            }
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
          />
          {this.props.iconRight ? (
            <img
              onClick={this.props.iconRightClick}
              className="icon-size icon-right "
              src={this.props.iconRight}
            />
          ) : null}

          {this.props.showPasswordIcon && this.props.password ? (
            <div>
              <div
                onClick={() =>
                  this.setState({ isPassowrd: !this.state.isPassowrd })
                }
              >
                <div className="show-password-container">
                  {this.state.isPassowrd ? (
                    <img
                      className={"password-show"}
                      src="/images/home/password_off.svg"
                      size={20}
                    />
                  ) : (
                    <img
                      className={"password-hide"}
                      src="/images/home/password_on.svg"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {this.props.error ? (
          <span className={classes.error + " font8"}>
            {this.props.errorMessage}
          </span>
        ) : null}
      </div>
    );
  }
}

export default MyInput;
