import React from "react";

const handleChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};

const handleSubmit = () => {};

export { handleChange, handleSubmit };
