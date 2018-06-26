const { adminCredentials, managerCredentials } = require('../constants/credentials')
const api = require('../helpers/api-calls')
const payload = require('../helpers/payload-factory-utility')


describe('user endpoint', function () {
	let id, adminToken, managerToken, id2, userToken, user

	const signUpForAUser = async () => {
		user = payload.newUser()
		const res = await api.signup(user).expect(201).catch(err => { throw err })
		id = res.body.user._id
		userToken = res.body.token
	}

	describe('signup up a regular user', () => {
		beforeAll(async () => {
			await signUpForAUser()
		})
		describe('changing my password', () => {
			fit('should respond successfully', async () => {
				await api.updateMyPassword(id, userToken, { oldPassword: '456565654ds', newPassword: '1234567a' }).expect(200)
			})
			it('should not accept invalid passwords', async () => {
				await api.updateMyPassword(id, userToken, { oldPassword: user.password, newPassword: '122' }).expect(422)
			})
		})

		describe('activating account from backend', () => {
			it('should respond with 422 if invalid code is provided', async () => {
				await api.activateFromBackEnd({ email: user.email, code: '111111111111' }).expect(422)
			})
		})


		describe('logging in an admin and a manager', () => {
			beforeAll(async () => {
				adminToken = (await api.login(adminCredentials)).body.token
				managerToken = (await api.login(managerCredentials)).body.token
			})

			describe('activating user administratively', () => {
				let res
				beforeAll(async () => {
					res = await api.activateUserAdministratively(id, adminToken).expect(200)
				})
				it('should activate user', () => {
					expect(res.body).toBeTruthy()
				})
			})

			describe('changing user password as admin', () => {
				let newUser, newUserId
				beforeAll(async () => {
					newUser = payload.newUser()
					const res = await api.signup(newUser).expect(201)
					newUserId = res.body.user._id
				})

				it('admin should change password successfully', async ()=>{
					await api.login({email: newUser.email, password: newUser.password}).expect(200)
					await api.login({email: newUser.email, password: '123456789v'}).expect(401)
					await api.updateOtherUserPassword(newUserId, adminToken, {newPassword: '123456789v'}).expect(200)
					await api.login({email: newUser.email, password: '123456789v'}).expect(200)
				})
			})


			describe('getting Users', () => {
				let res;
				beforeAll(async () => {
					res = await api.getUsers(adminToken).expect(200)
				})
				it('should get users successfully as an admin', () => {
					expect(res).toBeTruthy()
				})
				it('should get users successfully as a manager', async () => {
					await api.getUsers(managerToken).expect(200)
				})
				describe('user schema', () => {
					it('should have count property', () => {
						expect(res.body.count).toBeTruthy()
					})
					it('should have name property', () => {
						expect(res.body.users[0].name).toBeTruthy()
					})
					it('should have maxCalories property', () => {
						expect(res.body.users[0].maxCalories).toBeTruthy()
					})
					it('should have role property', () => {
						expect(res.body.users[0].role).toBeTruthy()
					})
					it('should have isTrackingDisplayed property', () => {
						expect(res.body.users[0].isTrackingDisplayed).toBeDefined()
					})
				})
			})


			describe('getting User details', () => {
				let res;
				beforeAll(async () => {
					res = await api.getUserDetails(id, adminToken).expect(200)
				})
				it('should get user details successfully as an admin', () => {
					expect(res).toBeTruthy()
				})
				it('should get user details successfully as a manager', async () => {
					await api.getUsers(managerToken).expect(200)
				})
				describe('user schema', () => {
					it('should have name property', () => {
						expect(res.body.name).toBe(user.name)
					})
					it('should have maxCalories property', () => {
						expect(res.body.maxCalories).toBe(user.maxCalories)
					})
					it('should have regular role property', () => {
						expect(res.body.role).toBe('regular')
					})
					it('should have isTrackingDisplayed property', () => {
						expect(res.body.isTrackingDisplayed).toBeDefined()
					})
				})
			})
		})

		describe('sigining up', () => {
			let newUser
			beforeAll(() => {
				newUser = payload.newUser()
			})
			it('should add user', async () => {
				await api.signup(newUser).expect(201)
			})
			it('should not allow duplicate emails', async () => {
				await api.signup(newUser).expect(409)
			})
			it('should respond by error message in case password have no letter', async () => {
				newUser.password = '12236565'
				await api.signup(newUser).expect(422)
			})

			it('should respond by error message in case password have no number', async () => {
				newUser.password = 'herogymisthe'
				await api.signup(newUser).expect(422)
			})
			it('should respond by error message in case password is not lengthy enough', async () => {
				newUser.password = 'i5o'
				await api.signup(newUser).expect(422)
			})
			it('should respond by error message in case name is not provided', async () => {
				newUser.name = undefined
				await api.signup(newUser).expect(422)
			})
			it('should respond by error message in case email is not provided', async () => {
				newUser.email = undefined
				await api.signup(newUser).expect(422)
			})
			it('should respond by error message in case password is not provided', async () => {
				newUser.password = undefined
				await api.signup(newUser).expect(422)
			})
			it('should respond by error message in case email do not have the appropriate format', async () => {
				newUser.email = 'thisIsNOTanEmail'
				await api.signup(newUser).expect(422)
			})
		})

		describe('deleting user', () => {
			beforeEach(async () => {
				await signUpForAUser()
			})
			it('admin should delete successfully ', async () => {
				await api.deleteUser(id, adminToken).expect(200)
			})
			it('manager should delete successfully ', async () => {
				await api.deleteUser(id, managerToken).expect(200)
			})
		})

		describe('update user info', () => {
			beforeAll(async () => {
				await signUpForAUser()
			})
			it('admin should update info successfully ', async () => {
				const updatedInfoPayload = payload.updatedInfoPayload()
				const res = await api.updateUserInfo(id, adminToken, updatedInfoPayload).expect(200)
				expect(res.body.name).toBe(updatedInfoPayload.name)
				expect(res.body.maxCalories).toBe(updatedInfoPayload.maxCalories)
				expect(res.body.isTrackingDisplayed).toBe(updatedInfoPayload.isTrackingDisplayed)
			})
		})

		describe('logging in', () => {
			let loginPayload
			beforeEach(() => {
				loginPayload = {
					email: user.email,
					password: user.password
				}
			})

			beforeAll(async () => {
				await signUpForAUser()
			})

			it('should login', async () => {
				await api.login(loginPayload).expect(200)
			})

			it('should not login with wrong credentials', async () => {
				await api.login({ email: 'randomEmail@test33.com', password: '454ds65ds8ew' }).expect(401)
			})

			it('should have token', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.token).toBeTruthy()
			})
			it('should have user object', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.user).toBeTruthy()
			})
			it('should have name', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.user.name).toBeTruthy()
			})
			it('should have email', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.user.email).toBe(user.email)
			})
			it('should have _id', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.user._id).toBeTruthy()
			})
			it('should have role', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.user.role).toBe('regular')
			})
			it('should not have password in response', async () => {
				const res = await api.login(loginPayload)
				expect(res.body.user.password).toBeFalsy()
			})
			it('should not login in case password is incorrect', async () => {
				loginPayload.password = '12236565rew'
				await api.login(loginPayload).expect(401)
			})
		})


		describe('assigning role', () => {
			beforeAll(async () => {
				await signUpForAUser()
			})
			describe('acting as an admin', () => {
				it('should not allow unauthenticated users', async () => {
					await api.updateRole(id, 'dsad', 'manager').expect(401)
				})

				it('should update role to manager ', async () => {
					await api.updateRole(id, adminToken, 'manager').expect(200)
				})

				it('should update role to admin ', async () => {
					await api.updateRole(id, adminToken, 'admin').expect(200)
				})

				it('should update role to regular', async () => {
					await api.updateRole(id, adminToken, 'regular').expect(200)
				})

				it('should return 422 if no id is provided', async () => {
					await api.updateRole(null, adminToken, 'admin').expect(422)
				})
			})
			describe('acting as a manager', () => {
				it('should not be authorised update role ', async () => {
					await api.updateRole(id, managerToken, 'regular').expect(403)
				})
			})
		})
	})
})
