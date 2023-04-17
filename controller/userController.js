import expressAsyncHandler from 'express-async-handler'
import User from '../models/Users.js';

const userController = {

    ansQuestion: expressAsyncHandler(async (req, res) => {
        const { q_no, ans, time, email } = req.body;
        const isCorrect = findAns(q_no, ans);
        const user = await User.findOne({
            email
        });
        // const q = user.questionsStats.find(q => q.q_no === q_no)
        // if (q) {
        //     q.time = time
        //     q.isCorrect = isCorrect
        // }
        // replace the previous answer with the new one
        user.questionsStats = user.questionsStats.filter(q => q.q_no !== q_no)
        user.questionsStats.push({
            q_no,
            time,
            isCorrect
        })
        await user.save()
        // console.log(user)
        if (isCorrect) {

            res.status(200).json({
                status: 'success',
                data: {
                    isCorrect,
                    time
                }
            })
        }
        else {
            res.status(200).json({
                status: 'success',
                data: {
                    isCorrect,
                    time
                }
            })
        }

    }),
    createUser: expressAsyncHandler(async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({
            email
        })
        if (!user) {

            await User.create({
                email
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                msg: 'User created successfully'
            }
        })



    }
    ),
    getLeaderboard: expressAsyncHandler(async (req, res) => {
        const users = await User.find({})
        const usersWithScore = users.map(user => {
            const score = user.questionsStats.reduce((acc, q) => {
                if (q.isCorrect) {
                    return acc + 1
                }
                return acc
            }, 0)
            return {
                email: user.email,
                score
            }
        })
        usersWithScore.sort((a, b) => b.score - a.score)

        res.status(200).json({
            status: 'success',
            data: {
                users: usersWithScore
            }
        })
    }
    ),

}


export default userController



const findAns = (q_no, ans) => {
    switch (q_no) {
        case 1:
            if (ans === 'death') {
                return true
            }
            return false
        case 2:
            if (ans === 'fan') {
                return true
            }
            return false
        case 3:
            if (ans === 'marie gold') {
                return true
            }
            return false
        case 4:
            if (ans === 'aj styles') {
                return true
            }
            return false
        case 5:
            if (ans === 'end') {
                return true
            }
            return false
        default:
            return false
    }
}