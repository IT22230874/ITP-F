import React from "react";
import { Link } from "react-router-dom";

export const Adduser = () => {
  return <Link to="/" />;
};

export const Login = () => {
  return <Link to="/login" />;
};

export const Home = () => {
  return <Link to="/home" />;
};

export const CustomeLink = ({ path, Name }) => {
  <Link to={path} className="link">
    {Name}{" "}
  </Link>;
};

export default {
  Adduser,
  Login,
  Home,
};
