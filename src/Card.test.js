import React from "react";
import { render } from "@testing-library/react";
import Card from './Card';
import '@testing-library/jest-dom';

it('renders without crashing', () => {
    const dummyProps = {
        caption: 'Test Image',
        src: 'test.jpg',
        currNum: 1,
        totalNum: 5
    };

    render(<Card {...dummyProps} />);
});