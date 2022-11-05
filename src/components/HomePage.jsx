import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";

import trophyImgUrl from "../assets/home-trophy.png";
import React from "react";
import { ProductsCard } from "./ProductsCard";
import { NavBar } from "./NavBar";
import { ResourcePicker } from "@shopify/app-bridge-react";



class HomePage extends React.Component {
  state = {
    open:false, 
  }
  render() 
  {
  return (
    <Page fullWidth
    title="Product Selector"
    primaryAction={{
      content: "Select Products",
      onAction: () => this.setState({open:true})
    }}
    >
      <Layout>
      <Layout.Section>
          <NavBar />
        </Layout.Section>
        <Layout.Section secondary>
          <ProductsCard />
        </Layout.Section>
        <Layout.Section>
          <ResourcePicker 
            resourceType="Product"
            open={this.state.open}
            onCancel={() => this.setState({open:false})}
            onSelection={(resorces) => this.handleSelection(resorces) }
          />
        </Layout.Section>

      </Layout>
    </Page>
  );
}
  handleSelection = (resources) => {
    const idList = resources.selection.map((productId) => productId.id)
  this.setState({open:false}) 
  console.log(idList);
}


}

export default HomePage 