import React, { useState } from "react";

// layout for page

import Auth from "layouts/Auth.js";

export default function Register(props) {

  const [messageState, setMessageState] = useState(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onClickRegister =  async() => {
    setNewUser(newUser)
    grecaptcha.ready(async () => {
      try {
        const captchaResponse = await grecaptcha.execute(
          props.recaptchaKey,
          {action: 'submit'}
        )

        const apiResponse = await fetch('/api/v1/register', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            recaptchaToken: captchaResponse,
            user: newUser
          })
        })
        console.log({ apiResponse })
        const response = await apiResponse.json()

        if (response.status == 'success') {
          setMessageState({
            color: 'lightBlue',
            message: 'Usuário cadastrado com sucesso. Verifique seu email'
          })
          return
        }
        
        setMessageState({
          color: 'orange',
          message: response.message
        })
      } catch (error) {
        console.log('deu erro', { error })
        setMessageState({
          color: 'orange',
          message: 'Houve uma falha ao realizar o registro.'
        })
      }
    })
  }

  let alertError = null

  if (messageState) {
    let alertClass = `text-white px-6 py-4 border-0 rounded relative mb-4 bg-${messageState.color}-500`
    alertError = <div className={alertClass}>
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell"></i>
      </span>
      <span className="inline-block align-middle mr-8">
        {messageState.message}
      </span>
    </div>
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Se cadastre com
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  {alertError}
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/facebook.svg" />
                    Facebook
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou informe seus dados</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {newUser.name = e.target.value}}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Informe seu nome"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => {newUser.email = e.target.value}}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      onChange={(e) => {newUser.password = e.target.value}}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Eu concordo com a {" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Política de privacidade
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={(e) => onClickRegister()}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Registrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;


export async function getStaticProps() {

  return {
    props: {
      recaptchaKey: process.env.RECAPTCHA_KEY
    }
  }
}
