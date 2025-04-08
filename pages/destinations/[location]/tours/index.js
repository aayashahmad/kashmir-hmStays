
import MainWrapper from "../../../../components/wrapper/wrapper";
import ContentContainer from "../../../../components/content-container/content-container";
import { useEffect, useState } from "react";
import { callApi } from "../../../../services/api/callApi";
import { selectedLocationState } from "../../../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import PackageListing from "../../../../components/package-listing";
import Gallery from "../../../../components/gallery-component";

const TodoPage = () => {
  //recoil states
  const selectedLocation = useRecoilValue(selectedLocationState);

  //local states
  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([
    { id: 1, img: "/images/about-images/a1.jpg" },
    { id: 2, img: "/images/about-images/a7.jpg" },
    { id: 3, img: "/images/about-images/a3.jpg" },
    { id: 4, img: "/images/about-images/a4.jpg" },
    { id: 5, img: "/images/about-images/a5.jpg" },
    { id: 6, img: "/images/about-images/a6.jpg" },
  ]);

  useEffect(() => {
    if (selectedLocation) {
      callApi({
        endPoint: `packages/location/${selectedLocation?.name}`,
        method: "GET",
        callback: (result) => {
          if (result?.status === 200) {
            setPackages(result.data.data);
          } else {
            console.log("error");
          }
        },
      });
    }
  }, [selectedLocation]);
  return (
    <MainWrapper headerAbsolute={true} headerFixed={false} smallHeader={true}>
      <ContentContainer>
        {packages && <PackageListing myPackages={packages} />}
        <Gallery title2={"Traveller Image Gallery"} images={gallery} />
      </ContentContainer>
    </MainWrapper>
  );
};

export default TodoPage;
