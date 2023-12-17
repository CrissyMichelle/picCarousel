import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import '@testing-library/jest-dom';

it('renders without crashing', () => {
  const dummyProps = {
    photos: [{src: "test1.com", caption: "testing image 1"}],
    title: 'Test Carousel'
  };

  render(<Carousel {...dummyProps} />);
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { container } = render(
    <Carousel
    photos={TEST_IMAGES}
    title="images for testing"
    />
  );

  // expect only the first image to show
  expect(
    container.querySelector('img[alt="testing image 1"]'))
    .toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect only the second image to show
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]'))
    .not.toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect only the first image to show
  expect(
    container.querySelector('img[alt="testing image 1"]'))
    .toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .not.toBeInTheDocument();
  });

it("properly hides the correct arrow", () => {
  const { container } = render(
    <Carousel
    photos={TEST_IMAGES}
    title="images for testing"
    />
  );

  const image1 = container.querySelector('img[alt="testing image 1"]');
  const image2 = container.querySelector('img[alt="testing image 2"]');
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  // expect only the first image to show
  expect(image1).toBeInTheDocument();
  expect(image2).not.toBeInTheDocument();
  // expect only the right arrow to show
  expect(rightArrow).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument();

  fireEvent.click(rightArrow);

  /** The DOM changes after React updates the Carousel component's state */
  
  // Re-query elements after state update
  const image1updated = container.querySelector('img[alt="testing image 1"]');
  const image2updated = container.querySelector('img[alt="testing image 2"]');
  const rightArrowUpdated = container.querySelector(".bi-arrow-right-circle");
  const leftArrowUpdated = container.querySelector(".bi-arrow-left-circle");

  // expect only the second image to show
  expect(image2updated).toBeInTheDocument();
  expect(image1updated).not.toBeInTheDocument();
  // expect both arrows to show since we have three test images
  expect(leftArrowUpdated).toBeInTheDocument();
  expect(rightArrowUpdated).toBeInTheDocument();

  fireEvent.click(rightArrowUpdated);

  // Re-query elements AGAIN
  const AGAINimage1updated = container.querySelector('img[alt="testing image 1"]');
  const AGAINimage2updated = container.querySelector('img[alt="testing image 2"]');
  const image3 = container.querySelector('img[alt="testing image 3"]');
  const AGAINrightArrowUpdated = container.querySelector(".bi-arrow-right-circle");
  const AGAINleftArrowUpdated = container.querySelector(".bi-arrow-left-circle");

  // expect only the third image to show
  expect(image3).toBeInTheDocument();
  expect(AGAINimage1updated).not.toBeInTheDocument();
  expect(AGAINimage2updated).not.toBeInTheDocument();
  // expect only the left arrow to show
  expect(AGAINleftArrowUpdated).toBeInTheDocument();
  expect(AGAINrightArrowUpdated).not.toBeInTheDocument();
})