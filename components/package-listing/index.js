import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import {
  allPackagesState,
  selectedPackageTabState,
} from "../../recoil/atoms/common";
import PackageItem from "../package-item";
import { useGetCategorisedPackages } from "../../hooks/use-get-categoriesed-packages";
import LeftHighlightedTitle from "../left-highlighted-title";
import "react-alice-carousel/lib/alice-carousel.css";
import PacksCarousel from "../packs-carousel/carousel";
import useScreenWidth from "../../hooks/useScreenWidth";

const PackageListing = ({ myPackages }) => {
  const router = useRouter();
  let screenWidth = useScreenWidth();
  console.log(screenWidth, "screenwidth in package item");

  //recoil state vars
  const activeTab = useRecoilValue(selectedPackageTabState);
  const packages = useRecoilValue(allPackagesState);

  //local states
  const [groupedPackages, setGroupedPackages] = useState({});
  const [packagesToDisplay, setPackagesToDisplay] = useState([]);

  useEffect(() => {
    if (myPackages?.length) {
      setPackagesToDisplay(myPackages);
    } else {
      setPackagesToDisplay(packages);
    }
  }, [myPackages]);

  useEffect(() => {
    if (packagesToDisplay?.length) {
      setGroupedPackages(useGetCategorisedPackages(packagesToDisplay));
    }
  }, [packagesToDisplay]);

  return (
    <div style={styles.honeymoon_parent}>
      {activeTab?.id === 0 ? (
        <div>
          {Object.keys(groupedPackages).map((key) => {
            return (
              <div key={key}>
                <div>
                  <LeftHighlightedTitle
                    title={"Homestays in kashmir"}
                    top={0}
                  />
                </div>
                <div
                  style={
                    screenWidth <= 568
                      ? styles.honeymoon_parent_body_adjusted
                      : screenWidth <= 1024 && screenWidth > 920
                      ? styles.honeymoon_parent_body_max_1024
                      : screenWidth <= 920 && screenWidth > 568
                      ? styles.honeymoon_parent_body_max_920
                      : styles.honeymoon_parent_body
                  }
                >
                  {groupedPackages[key].length > 2 ? (
                    <PacksCarousel
                      items={groupedPackages[key]}
                      router={router}
                    />
                  ) : (
                    groupedPackages[key]?.map((pack) => (
                      <PackageItem key={pack.id} pack={pack} />
                    ))
                  )}
                </div>
                <div style={styles.separator}></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={
            screenWidth <= 568
              ? styles.honeymoon_parent_body_adjusted
              : screenWidth <= 1024 && screenWidth > 920
              ? styles.honeymoon_parent_body_max_1024
              : screenWidth <= 920 && screenWidth > 568
              ? styles.honeymoon_parent_body_max_920
              : styles.honeymoon_parent_body
          }
        >
          {groupedPackages[activeTab?.title]?.length > 2 ? (
            <PacksCarousel
              items={groupedPackages[activeTab?.title]}
              router={router}
            />
          ) : (
            groupedPackages[activeTab?.title]?.map((pack) => (
              <PackageItem key={pack.id} pack={pack} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  honeymoon_parent: {
    padding: "0 0 70px 0",
    paddingTop: 76,
  },
  honeymoon_parent_body: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    position: "relative",
  },
  honeymoon_parent_body_adjusted: {
    display: "grid",
    position: "relative",
  },
  honeymoon_parent_body_max_1024: {
    gridTemplateColumns: "repeat(2,1fr)",
  },
  honeymoon_parent_body_max_920: {
    gridTemplateColumns: "repeat(1,1fr)",
  },
  separator: {
    width: "100%",
    height: "1px",
    background: "linear-gradient(to right, transparent, black, transparent)",
    marginTop: "60px",
    marginBottom: "40px",
  },
};

export default PackageListing;
