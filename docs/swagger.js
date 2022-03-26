// =================== Users ===================

/** Users
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get Users
 *    tags:
 *      - Users (Unauthorized)
 *    parameters:
 *      - in: query
 *        name: page
 *        type: integer
 *        required: false
 *      - in: query
 *        name: limit
 *        type: integer
 *        required: false
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Add Users
 * @swagger
 * /api/users/:
 *  post:
 *    summary: Add Users
 *    tags:
 *      - Users (Unauthorized)
 *    parameters:
 *      - in: body
 *        name: body
 *        properties:
 *          full_name:
 *            type: string
 *            required: true
 *          address:
 *            type: string
 *            required: true
 *          email:
 *            type: string
 *            required: true
 *          password:
 *            type: string
 *            required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Show Users
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Show Users
 *    tags:
 *      - Users (Unauthorized)
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Edit Users
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Edit Users
 *    tags:
 *      - Users (Unauthorized)
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *      - in: body
 *        name: body
 *        properties:
 *          full_name:
 *            type: string
 *            required: true
 *          address:
 *            type: string
 *            required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Delete Users
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Delete Users
 *    tags:
 *      - Users (Unauthorized)
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

// =================== Authentication ===================

/** Login
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Add Users
 *    tags:
 *      - Authentication
 *    parameters:
 *      - in: body
 *        name: body
 *        properties:
 *          email:
 *            type: string
 *            required: true
 *          password:
 *            type: string
 *            required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Books
 * @swagger
 * /api/auth/logout:
 *  get:
 *    summary: Get Books
 *    tags:
 *      - Authentication
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

// =================== Books ===================

/** Books
 * @swagger
 * /api/books:
 *  get:
 *    summary: Get Books
 *    tags:
 *      - Books (Authorized)
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: query
 *        name: page
 *        type: integer
 *        required: false
 *      - in: query
 *        name: limit
 *        type: integer
 *        required: false
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Add Books
 * @swagger
 * /api/books/:
 *  post:
 *    summary: Add Books
 *    tags:
 *      - Books (Authorized)
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *      - in: body
 *        name: body
 *        properties:
 *          book_number:
 *            type: string
 *            required: true
 *          book_title:
 *            type: string
 *            required: true
 *          address:
 *            type: string
 *            required: true
 *          author:
 *            type: string
 *            required: true
 *          publication_year:
 *            type: number
 *            required: true
 *          publisher:
 *            type: string
 *            required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Show Books
 * @swagger
 * /api/books/{id}:
 *  get:
 *    summary: Show Books
 *    tags:
 *      - Books (Authorized)
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Edit Books
 * @swagger
 * /api/books/{id}:
 *  put:
 *    summary: Edit Books
 *    tags:
 *      - Books (Authorized)
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *      - in: body
 *        name: body
 *        properties:
 *          book_number:
 *            type: string
 *            required: true
 *          book_title:
 *            type: string
 *            required: true
 *          address:
 *            type: string
 *            required: true
 *          author:
 *            type: string
 *            required: true
 *          publication_year:
 *            type: number
 *            required: true
 *          publisher:
 *            type: string
 *            required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */

/** Delete Books
 * @swagger
 * /api/books/{id}:
 *  delete:
 *    summary: Delete Books
 *    tags:
 *      - Books (Authorized)
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: A successfull response
 */
