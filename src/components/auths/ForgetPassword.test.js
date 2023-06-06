import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import { Provider,useDispatch, useSelector } from "react-redux";
import userEvent from '@testing-library/user-event'
import store from "../../redux/store";
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import Input from '../checkValidate/Input';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';

// function wait(milliseconds){
//     return new Promise(resolve => {
//         setTimeout(resolve, milliseconds);
//     });
//   }
describe("ForgetPassword", () => {
  it("should render ForgetPassword component correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ForgetPassword/>
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
          <ForgetPassword/>
        </BrowserRouter>
      </Provider>
    );
    //Only input username and phone
    await userEvent.type(screen.getByPlaceholderText("Enter Username"), 'kunal')
    await userEvent.type(screen.getByPlaceholderText("Enter Phone"), '0945291068')
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
    expect(screen.getByText("Please Enter Email.")).toBeInTheDocument();
  });

    it("call api when enter information correct", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                <ForgetPassword/>
                </BrowserRouter>
            </Provider>
        );
        await userEvent.type(screen.getByPlaceholderText("Enter Username"), 'khanhvan')
        await userEvent.type(screen.getByPlaceholderText("Enter Phone"), '0945291068')
        await userEvent.type(screen.getByPlaceholderText("Enter Email"), 'k@gmail.com')
        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        //return loading
        expect(screen.getByRole("status")).toBeInTheDocument();
        screen.debug();
    });
});