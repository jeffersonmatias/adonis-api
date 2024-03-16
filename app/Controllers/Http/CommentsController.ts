import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'
export default class CommentsController {

    public async store({ request, params, response }: HttpContextContract) {
        const body = request.body()
        const momentId = params.momentId

        await Moment.findOrFail(momentId)
        body.momentId = momentId

        const comment = await Comment.create(body)
        response.status(201)
        return {
            message: "Comentario adicionado com sucesso!",
            data: comment
        }
    }

    public async show({ params }: HttpContextContract) {
        const comment = await Comment.findOrFail(params.id)
        return { data: comment }
    }

    public async destroy({ params }: HttpContextContract) {
        const comment = await Comment.findOrFail(params.id)
        await comment.delete()
        return {
            message: "Comentário excluido com sucesso!",
            data: comment
        }
    }

    public async update({ request, params }: HttpContextContract) {
        const body = request.body()
        const comment = await Comment.findOrFail(params.id)

        comment.username = body.username
        comment.text = body.text

        await comment.save()

        return {
            message: "Comentario atualizado com sucesso!",
            data: comment
        }
    }
}
