import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
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

describe("SignUp", () => {
    it("should show error message when one of the fields are not entered", async () => {
        render(
        <Provider  store={store}>
            <BrowserRouter>
            <SignUp/>
            </BrowserRouter>
        </Provider>
        );
        //Not input ConfirmPassword
        await userEvent.type(screen.getByPlaceholderText("Enter Username"), 'kunal')
        await userEvent.type(screen.getByPlaceholderText("Enter Password"), '123456')
        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        expect(screen.getByText("Please Enter Confirm Password.")).toBeInTheDocument();
    });

    it("should show error message when password and confirm password not same", async () => {
        render(
        <Provider  store={store}>
            <BrowserRouter>
            <SignUp/>
            </BrowserRouter>
        </Provider>
        );
        //Not input ConfirmPassword
        await userEvent.type(screen.getByPlaceholderText("Enter Password"), '123456')
        await userEvent.type(screen.getByPlaceholderText("Enter Confirm Password"), '1234567')
        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        expect(screen.getByText("Confirm Password Does Not Match Password")).toBeInTheDocument();
    });

//   it("should show error message when enter wrong information", async () => {
//     //     const fakeAccount = [
//     //     { 
//     //         username: 'khanhvan', 
//     //         password: '123456',
//     //     }
//     //   ]
//     //   fetchMock.mockReject(() => Promise.reject('API error'))
//       render(
//         <Provider  store={store}>
//             <BrowserRouter>
//             <SignUp/>
//             </BrowserRouter>
//         </Provider>
//         );
//     //When wrong password
//     userEvent.type(screen.getByPlaceholderText("Enter Username"), 'khanhvan1')
//     userEvent.type(screen.getByPlaceholderText("Enter Password"), '12345')
//     const buttonElement = screen.getByRole("button");
//     userEvent.click(buttonElement);
//     // await waitFor(()=>{
//     //     const errorMessage = screen.findByText("Username or Password is not correct")
//     //     expect(errorMessage).toBeInTheDocument();
//     // })
//     await waitFor(() => expect(screen.getByText("Username or Password is not correct")).toBeInTheDocument());
//     // expect(errorMessage).toBeInTheDocument();
//     // screen.debug();
//   });
});