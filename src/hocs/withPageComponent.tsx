import React from "react";
import { useTranslations } from "next-intl";


const SomeComponentConsumesUseTranslation = () => {
  const tWith= useTranslations("WithPageComponent");
  const text = tWith("title")
  return <div id="helloworld">{text}</div>;
}
const withPageComponent = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithWrapper = (props: P) => {
    return (
      <>
        <SomeComponentConsumesUseTranslation />
        <WrappedComponent {...props} />
      </>
    );
  };
  return WithWrapper;
};
withPageComponent.displayType = "PageComp";

export default withPageComponent;
