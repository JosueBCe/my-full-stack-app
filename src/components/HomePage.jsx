import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import ResourceListWithProducts from '../graphql/ResourceList';
import store from 'store-js';
import { Heading, Page, TextStyle, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';


class HomePage extends React.Component {
  state = { open: false };
  render() {
    // A constant that defines your app's empty state
    const emptyState = !store.get('ids');
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? ( // Controls the layout of your app's empty state
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Select products',
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
          // Uses the new resource list that retrieves products by IDs
          <ResourceListWithProducts />
        )}
      </Page>
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids', idsFromResources);
  };
}
export default HomePage;



/* NEXT STEPS 

In your app, you can now update the prices of products.

![GIF showing how to populate data in a development store](https://shopify.dev/assets/apps/randomize-prices-a8c49c220e447a3b5ac233f582eddd2a9bc81050c32c601b5de6ae99001e8ae8.gif)




## Next steps[](https://shopify.dev/apps/getting-started/add-functionality#next-steps)

-   Use  [webhooks](https://shopify.dev/apps/webhooks)  to stay in sync with Shopify or execute code after a specific event occurs in a shop.
-   Identify your  [app business model](https://shopify.dev/apps/billing/models)  and learn how to use the  [Billing API](https://shopify.dev/apps/billing)  to bill customers with recurring monthly charges or one-time purchases.
-   Learn how to use  [app extensions](https://shopify.dev/apps/app-extensions)  to add features to Shopify admin or POS.
-   Explore the  [GraphQL Admin API](https://shopify.dev/api/admin/graphql/reference)  and  [REST Admin API](https://shopify.dev/api/admin/rest/reference)  references.*/