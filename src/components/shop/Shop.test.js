import React, { useEffect, useState, useCallback } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { Provider,useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { getAllProducts, getProductFilter, getProductPageable } from '../../redux/actions/ProductAction';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link, useSearchParams } from "react-router-dom";
import Loading from '../loadingError/Loading';
import Message from "../loadingError/Message";
import { createLineItem } from '../../redux/actions/WishlistAction'
import { toast } from 'react-toastify';

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paginations from "../pagination/Paginations";
import Shop from "./Shop";
import userEvent from '@testing-library/user-event'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
global.fetch = require('jest-fetch-mock')
beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse('[]')
})
describe("Shop", () => {
    it("View list product", async () => {
      fetch.mockResponse(JSON.stringify(
        [
          {
            id: 14,
            status: "1",
            name: "Nike Air Force One",
            price: "199",
            description: "The Nike Air Force 1 remains a popular retro shoe to this day. The Air Force 1 features an upper that is most frequently dressed in leather, a large Swoosh across the lateral.",
            images: [
                {
                    id: 42,
                    link: "https://res.cloudinary.com/dhc3ajdqs/image/upload/v1670077941/upload/wnofmomih8yves5ku9vy.jpg"
                },
                {
                    id: 39,
                    link: "https://res.cloudinary.com/dhc3ajdqs/image/upload/v1670077928/upload/whpncimfidhpkss7ul9h.jpg"
                },
                {
                    id: 41,
                    link: "https://res.cloudinary.com/dhc3ajdqs/image/upload/v1670077937/upload/ymggubvouxxbm30squzt.jpg"
                },
                {
                    id: 40,
                    link: "https://res.cloudinary.com/dhc3ajdqs/image/upload/v1670077933/upload/lkh9oxjibiozr73jdgp7.jpg"
                }
            ],
            productInfors: [
                {
                    id: 58,
                    size: "4.5",
                    amount: "10"
                },
                {
                    id: 57,
                    size: "4",
                    amount: "10"
                },
                {
                    id: 56,
                    size: "3.5",
                    amount: "10"
                },
                {
                    id: 59,
                    size: "5",
                    amount: "10"
                },
                {
                    id: 60,
                    size: "5.5",
                    amount: "9"
                }
            ]
        },
        {
            id: 15,
            status: "1",
            name: "Nike Air Max 270",
            price: "259",
            description: "The Max Air 270 unit delivers unrivaled, all-day comfort. The sleek, running-inspired design roots you to everything Nike.",
            images: [
                {
                    id: 44,
                    link: "https://res.cloudinary.com/dhc3ajdqs/image/upload/v1670077997/upload/fmhgghxkxzcvvavntasn.jpg"
                },
                {
                    id: 45,
                    link: "https://res.cloudinary.com/dhc3ajdqs/image/upload/v1670078003/upload/oqndy5zmhu9dwdkiihgs.jpg"
                }
            ],
            productInfors: [
                {
                    id: 65,
                    size: "5.5",
                    amount: "9"
                },
                {
                    id: 61,
                    size: "3.5",
                    amount: "15"
                }
            ]
        }
        ]
      ))
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Shop/>
          </BrowserRouter>
        </Provider>
      );
      const products = screen.getByRole('product')
      // expect(await screen.getByText("Please Enter Password.")).toBeInTheDocument();
      expect(await within(products).findByText('Nike Air Max 270')).toBeInTheDocument()
      // const products = screen.getByRole('list', {name: /products/i})
      // expect(within(products).findAllByRole('listitfem')).toHaveLength(2)
      // expect(await within(products).getByRole('listitem', { name: /Nike Air Max 270/ })).toBeInTheDocument()
      // const element = screen.getByRole("heading");
      // expect(element).toBeInTheDocument();
      screen.debug()
    });
});