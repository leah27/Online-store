import { gql } from '@apollo/client'
export const GET_DATA = gql`
query{
    categories	{
        name
      products {
            id
            name
            brand
        prices {
                amount
                currency
            }
            inStock
            gallery
            category
        attributes {
                id
                name
                type
          items {
                    id
                    value
                }
            }
            description
        }
    }
}`
