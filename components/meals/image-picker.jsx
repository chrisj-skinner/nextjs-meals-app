'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickImage() {
    imageInput.current.click(); // use ref to access the input element and trigger a click event
  }

  function handleImageChange(event) {
    const file = event.target.files[0]; // get the first file from the files array
    if (!file) {
      setPickedImage(null); // set the picked image to null if there is no file
      return;
    }
    const fileReader = new FileReader(); // create a new FileReader instance
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt='The image selected by the user'
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type='file'
          id={name}
          accept='imgae/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
      </div>
      <button
        className={classes.button}
        type='button'
        onClick={handlePickImage}
      >
        Pick an Image
      </button>
    </div>
  );
}
