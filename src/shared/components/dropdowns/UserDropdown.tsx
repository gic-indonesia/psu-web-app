'use client'
import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { handleLogout } from '@src/modules/auth/stores/auth.store'
import { useAppDispatch } from '@src/hooks/redux'

const UserDropdown = (props: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { isOpen, setIsOpen } = props
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(handleLogout());
    setIsOpen(false);
  };

  return (
    <Fragment>
      {
        isOpen && (
          <div className="relative block">
            <div className="origin-top-right absolute mt-2 right-0 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <li
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <label
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:outline-none hover:rounded-lg hover:cursor-pointer"
                    htmlFor="logout"
                    onClick={logout}
                  >
                    Logout
                  </label>
                </li>
              </ul>
            </div>
          </div>
        )
      }
    </Fragment>
  )
}

export default UserDropdown;