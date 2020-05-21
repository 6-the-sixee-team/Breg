## Server API

### Get reviews info
  * GET `/api/product/:productcode/reviews`

**Path Parameters:**
  * `productcode` product id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "product_id": "Number",
      "user_id": "Number",
      "title": "String",
      "text": "String",
      "rating_overall": "Number",
      "doesRecommend": "Boolean",
      "rating_size": "Number",
      "rating_width": "Number",
      "rating_comfort": "Number",
      "rating_quality": "Number",
      "isHelpful": "Number",
      "isNotHelpful": "Number",
      "created_at": "date YYYY-MM-MM",
      "uploaded_at": "date",
      "user_nickname": "String",
      "user_verified": "boolean",
      "user_email_auth": "String"
    }
```

### Add review
  * POST `/api/reviews`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "product_id": "Number",
      "user_id": "Number",
      "title": "String",
      "text": "String",
      "rating_overall": "Number",
      "doesRecommend": "Boolean",
      "rating_size": "Number",
      "rating_width": "Number",
      "rating_comfort": "Number",
      "rating_quality": "Number",
      "isHelpful": "Number",
      "isNotHelpful": "Number",
      "created_at": "date YYYY-MM-MM",
      "uploaded_at": "date",
      "user_nickname": "String",
      "user_verified": "boolean",
      "user_email_auth": "String"
    }
```


### Update review info
  * PATCH `/api/product/:productcode/reviews`

**Path Parameters:**
  * `productcode` product id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "product_id": "Number",
      "user_id": "Number",
      "title": "String",
      "text": "String",
      "rating_overall": "Number",
      "doesRecommend": "Boolean",
      "rating_size": "Number",
      "rating_width": "Number",
      "rating_comfort": "Number",
      "rating_quality": "Number",
      "isHelpful": "Number",
      "isNotHelpful": "Number",
      "created_at": "date YYYY-MM-DD",
      "uploaded_at": "date YYYY-MM-DD",
      "user_nickname": "String",
      "user_verified": "boolean",
      "user_email_auth": "String"
    }
```


### Delete review
  * DELETE `/api/reviews/:id`

**Path Parameters:**
  * `id` review id

**Success Status Code:** `204`
