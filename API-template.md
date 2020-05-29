## Server API

### Get reviews info
  * GET `/api/product/:id/reviews`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `200`

**Error Status Code:** `500`: Internal server error

**Error Status Code:** `400`: Bad Request

**Returns:** JSON

```json
    {
      "id": "Number",
      "product_id": "Number",
      "title": "String",
      "text": "String",
      "doesRecommend": "Boolean",
      "created_at": "Date",
      "user": {
        "id": "Number",
        "nickname": "String"
      }
    }
```

### Add review
  * POST `api/product/:id/reviews`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `201`

**Error Status Code:** `500`: Internal server error

**Error Status Code:** `400`: Bad Request

**Request Body**: Expects JSON with the following keys.

```json
    {
      "title": "String",
      "text": "String",
      "doesRecommend": "Boolean",
      "nickname": "String",
    }
```


### Update review info
  * PATCH `api/reviews/:id`

**Path Parameters:**
  * `id` review id

**Success Status Code:** `204`

**Error Status Code:** `500`: Internal server error

**Error Status Code:** `400`: Bad Request

**Error Status Code:** `404`: Product id does not match any existing products

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "title": "String",
      "text": "String",
      "doesRecommend": "Boolean",
      "nickname": "String",
    }
```


### Delete review
  * DELETE `/api/reviews/:id`

**Path Parameters:**
  * `id` review id

**Success Status Code:** `204`
