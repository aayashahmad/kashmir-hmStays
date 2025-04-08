import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allPackagesState } from "../../recoil/atoms/common";
import { callApi } from "../../services/api/callApi";
import PackageItem from "../package-item";
import classes from "./more-package.module.less";
import ContentContainer from "../content-container/content-container";
import LeftHighlightedTitle from "../left-highlighted-title";

function MorePackages({ router, title }) {
  const [packages, setPackages] = useRecoilState(allPackagesState);

  useEffect(() => {
    callApi({
      endPoint: "packages",
      method: "GET",
      callback: (result) => {
        if (result?.status === 200 && result?.data?.data?.length > 0) {
          setPackages(result.data.data);
        } else {
          console.error("Failed to fetch packages:", result);
        }
      },
    });
  }, []);

  return (
    <div className={classes.package_wrapper_parent}>
      <ContentContainer>
        {title && (
          <div style={{ marginBottom: "20px" }}>
            <LeftHighlightedTitle title={title} />
          </div>
        )}
        <div className={classes.package_wrapper}>
          {packages.length &&
            packages.slice(0, 3).map((pack, index) => {
              return <PackageItem pack={pack} />;
            })}
        </div>
      </ContentContainer>
    </div>
  );
}

export default MorePackages;
