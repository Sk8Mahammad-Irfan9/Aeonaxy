import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import {
  lazyload,
  placeholder,
} from "@cloudinary/react";

const Img = ({ uploadedImage }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUDINARY_NAME,
    },
  });

  const myImage = cld.image(uploadedImage);
  myImage
    .resize(thumbnail().width(100).height(100).gravity(focusOn(face())))
    .roundCorners(byRadius(20));

  return (
    <>
      <AdvancedImage
        cldImg={myImage}
        plugins={[lazyload(), placeholder({mode: 'predominant-color'})]}
      />
    </>
  );
};

export default Img;
