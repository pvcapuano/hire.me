/**
 * @swagger
 * tags:
 *   - name: URL Shortener
 *     description: Endpoints para encurtar e recuperar URLs
 */

/**
 * @swagger
 * /create:
 *   put:
 *     tags:
 *       - URL Shortener
 *     summary: Encurta uma URL
 *     description: Cria uma URL encurtada com alias opcional.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: URL original que será encurtada.
 *       - in: query
 *         name: CUSTOM_ALIAS
 *         schema:
 *           type: string
 *         required: false
 *         description: Alias customizado opcional.
 *     responses:
 *       200:
 *         description: URL encurtada criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alias:
 *                   type: string
 *                   example: bemobi
 *                 url:
 *                   type: string
 *                   example: http://localhost:3000/u/bemobi
 *                 statistics:
 *                   type: object
 *                   properties:
 *                     time_taken:
 *                       type: string
 *                       example: "10ms"
 *       400:
 *         description: URL não fornecida ou alias já existente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err_code:
 *                   type: string
 *                 description:
 *                   type: string
 */

/**
 * @swagger
 * /u/{alias}:
 *   get:
 *     tags:
 *       - URL Shortener
 *     summary: Redireciona para a URL original
 *     description: >
 *       Redireciona o usuário para a URL original associada ao alias.
 *       **Observação:** Por ser um redirecionamento HTTP (status 302),
 *       não é testável diretamente via Swagger UI devido a restrições de CORS.
 *       Para depuração, use o parâmetro opcional `noRedirect=true` para obter os dados em JSON.
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *         description: Alias da URL encurtada.
 *       - in: query
 *         name: noRedirect
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Se verdadeiro, retorna JSON em vez de redirecionar (para teste no Swagger).
 *     responses:
 *       302:
 *         description: Redireciona para a URL original.
 *       404:
 *         description: Alias não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err_code:
 *                   type: string
 *                   example: "002"
 *                 description:
 *                   type: string
 *                   example: "SHORTENED URL NOT FOUND"
 */

/**
 * @swagger
 * /top:
 *   get:
 *     tags:
 *       - URL Shortener
 *     summary: Lista as 10 URLs mais acessadas
 *     description: Retorna as 10 URLs mais acessadas com a contagem de acessos total.
 *     responses:
 *       200:
 *         description: Lista de URLs mais acessadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   original_url:
 *                     type: string
 *                     example: https://www.bemobi.com.br
 *                   total_access_count:
 *                     type: number
 *                     example: 42
 *       500:
 *         description: Erro ao buscar as URLs mais acessadas.
 */
