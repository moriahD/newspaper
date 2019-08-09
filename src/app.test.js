import React from "react";
import { render, waitForElement } from "@testing-library/react";
import App from "./app";
import axios from "./axios";

jest.mock("./axios");
test("app renders correctly", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "Funky",
            last: "Chicken",
            url: "/funckychicken.gif"
        }
    });
    const { container } = render(<App />);

    expect(container.innerHTML).tobe("");

    await waitForElement(() => container.querySelector("div"));

    console.log(container.innerHTmL);
});
