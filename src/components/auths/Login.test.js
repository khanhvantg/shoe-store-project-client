import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider,useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import Login from "./Login";


import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import Input from '../checkValidate/Input';
import ReactDOM from 'react-dom/client';
import userEvent from '@testing-library/user-event'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import axios from 'axios';
import { login } from "../../redux/actions/AuthAction";
import { act } from 'react-dom/test-utils';
import axios from "../../redux/actions/axios";
describe("Login", () => {
  it("should render Login component correctly", () => {
    render(
      <Provider  store={store}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });

  it("should show error message when one of the fields are not entered", async () => {
    render(
      <Provider  store={store}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    //Only input username
    await userEvent.type(screen.getByPlaceholderText("Enter Username"), 'kunal')
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
    expect(screen.getByText("Please Enter Password.")).toBeInTheDocument();
  });

    it("call api when enter information correct", async () => {
        render(
            <Provider  store={store}>
                <BrowserRouter>
                <Login/>
                </BrowserRouter>
            </Provider>
        );
        await userEvent.type(screen.getByPlaceholderText("Enter Username"), 'khanhvan')
        await userEvent.type(screen.getByPlaceholderText("Enter Password"), '123456')
        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        //return loading
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

  //   it("Login with wrong password", async () => {
  //     const form = {
  //       username: "khanhvan1",
  //       password: "12345"
  //     }
  //     render(
  //         <Provider store={store}>
  //             <BrowserRouter>
  //             <Login/>
  //             </BrowserRouter>
  //         </Provider>
  //     );
  //     // const userLogin = useSelector((state) => state.userLogin);
  //     // const { error, loading, userInfo } = userLogin;
  //     // act(() => {
  //     //   const { error, loading, userInfo } = store.dispatch(login({form}))
  //     //   console.log(userInfo)
  //     // })
  //     userEvent.type(screen.getByPlaceholderText("Enter Username"), 'khanhvan1')
  //     userEvent.type(screen.getByPlaceholderText("Enter Password"), '12345')
  //     const buttonElement = screen.getByRole("button");
  //     // await act( () => {
  //     userEvent.click(buttonElement);
  //     // const { data } = await axios.post("/api/auth/signin", form);
  //     // console.log(data)
  //     // });
  //     // await userEvent.click(buttonElement);
  //     // //return loading
  //     waitFor(()=>{
  //       expect(screen.getByText("Username or Password is not correct")).toBeInTheDocument();

  //     })
  //     // setTimeout(() => {
  //     //   expect(screen.getByText("Username or Password is not correct")).toBeInTheDocument();
  //     // }, 4800);
  //     screen.debug();
  //     // await act(async() => {
  //     //   await screen.debug();
  //     // })
  // });
});