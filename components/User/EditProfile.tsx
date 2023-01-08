import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../features/app/hook';
import { IUser2, updateUser } from '../../features/user/userSlice';

const EditProfile: FC<IUser2> = ({ user }) => {
  //   console.log(user.gender);
  const [name, setName] = useState<string>(user.name);
  const [dateofbirth, setDateofbirth] = useState<string>(user.date_of_birth);
  const [gender, setGender] = useState<string>(user.gender);

  const [email, setEmail] = useState<string | undefined>();
  const [phone, setPhone] = useState<number>(user.phone_number);
  const [openEditName, setOpenEditName] = useState<boolean>(false);
  const [openEditDob, setOpenEditDob] = useState<boolean>(false);
  const [openEditGender, setOpenEditGender] = useState<boolean>(false);
  const [openEditEmail, setOpenEditEmail] = useState<boolean>(false);
  const [openEditPhone, setOpenEditPhone] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleName = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const payload = { name };
    dispatch(updateUser(payload));
    // setOpenEditName(false);
  };

  const handleDofb = () => {
    setOpenEditDob(false);
    const payload = { date_of_birth: dateofbirth };
    dispatch(updateUser(payload));
  };
  const handleGender = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // setOpenEditGender(false);
    const payload = { gender };
    dispatch(updateUser(payload));
  };
  const handlePhoneNumber = () => {
    setOpenEditPhone(false);
    const payload = { phone_number: phone };
    dispatch(updateUser(payload));
  };

  return (
    <div className='section-center  space-y-8'>
      {/* name */}
      <div className='flex justify-between'>
        <div>
          <p className='text-lg font-semibold'>Full Name</p>

          {name !== null ? <p>{name}</p> : <p>No Name</p>}
          {openEditName && (
            <div className='mt-3'>
              <div className='flex gap-4'>
                <input
                  type='text'
                  name='fullname'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className='cursor-pointer font-semibold text-red-400'
                  onClick={() => {
                    setName(user.name);
                    setOpenEditName(false);
                  }}>
                  Cancel
                </button>
              </div>
              <button
                className='p-3 bg-black text-white rounded-lg mt-3 cursor-pointer'
                onClick={handleName}>
                Save
              </button>
            </div>
          )}
        </div>

        <button
          className={`${
            openEditName
              ? 'hidden'
              : 'primary-clr text-lg cursor-pointer underline'
          }`}
          onClick={() => setOpenEditName(true)}>
          Edit
        </button>
      </div>
      {/* end of name */}
      {/* Date of birth */}
      <div className='flex justify-between'>
        <div>
          <p className='text-lg font-semibold'>Date of birth</p>

          {dateofbirth !== null ? <p>{dateofbirth}</p> : <p>Not specified</p>}
          {openEditDob && (
            <div className='mt-3'>
              <div className='flex gap-4'>
                <input
                  type='text'
                  name='dateofbirth'
                  value={dateofbirth || ''}
                  onChange={(e) => setDateofbirth(e.target.value)}
                />
                <button
                  className='cursor-pointer font-semibold text-red-400'
                  onClick={() => setOpenEditDob(false)}>
                  Cancel
                </button>
              </div>
              <button
                className='p-3 bg-black text-white rounded-lg mt-3 cursor-pointer'
                onClick={handleDofb}>
                Save
              </button>
            </div>
          )}
        </div>

        <button
          className={`${
            openEditDob
              ? 'hidden'
              : 'primary-clr text-lg cursor-pointer underline'
          }`}
          onClick={() => setOpenEditDob(true)}>
          Edit
        </button>
      </div>
      {/* end of Date of birth */}

      {/* Gender*/}
      <div className='flex justify-between'>
        <div>
          <p className='text-lg font-semibold'>Gender</p>

          {gender !== null ? <p>{gender}</p> : <p>Not specified</p>}
          {openEditGender && (
            <div className='mt-3'>
              <div className='flex gap-4'>
                <select
                  className='  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setGender(e.target.value)}>
                  <option defaultValue='Not specified'>Choose a Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>

                <button
                  className='cursor-pointer font-semibold text-red-400'
                  onClick={() => setOpenEditGender(false)}>
                  Cancel
                </button>
              </div>
              <button
                className='p-3 bg-black text-white rounded-lg mt-3 cursor-pointer'
                onClick={(e) => handleGender(e)}>
                Save
              </button>
            </div>
          )}
        </div>

        <button
          className={`${
            openEditGender
              ? 'hidden'
              : 'primary-clr text-lg cursor-pointer underline'
          }`}
          onClick={() => setOpenEditGender(true)}>
          Edit
        </button>
      </div>
      {/* end of Gender */}

      {/* Phone*/}
      <div className='flex justify-between'>
        <div>
          <p className='text-lg font-semibold'>Phone Number</p>

          {phone !== null ? <p>{phone}</p> : <p>Not specified</p>}
          {openEditPhone && (
            <div className='mt-3'>
              <div className='flex gap-4'>
                <input
                  type='number'
                  name='phone'
                  value={phone}
                  onChange={(e) => setPhone(parseInt(e.target.value))}
                />

                <button
                  className='cursor-pointer font-semibold text-red-400'
                  onClick={() => setOpenEditPhone(false)}>
                  Cancel
                </button>
              </div>
              <button
                className='p-3 bg-black text-white rounded-lg mt-3 cursor-pointer'
                onClick={handlePhoneNumber}>
                Save
              </button>
            </div>
          )}
        </div>

        <button
          className={`${
            openEditPhone
              ? 'hidden'
              : 'primary-clr text-lg cursor-pointer underline'
          }`}
          onClick={() => setOpenEditPhone(true)}>
          Edit
        </button>
      </div>
      {/* end of Phone */}

      {/* Email*/}
      <div className='flex justify-between'>
        <div>
          <p className='text-lg font-semibold'>Email address</p>

          {user.email !== null ? <p>{user.email}</p> : <p>Not specified</p>}
          {/* {openEditEmail && (
            <div className='mt-3'>
              <div className='flex gap-4'>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className='cursor-pointer font-semibold text-red-400'
                  onClick={() => setOpenEditEmail(false)}>
                  Cancel
                </button>
              </div>
              <button
                className='p-3 bg-black text-white rounded-lg mt-3 cursor-pointer'
                onClick={handleDob}>
                Save
              </button>
            </div>
          )} */}
        </div>

        {/* <button
          className={`${
            openEditEmail
              ? 'hidden'
              : 'primary-clr text-lg cursor-pointer underline'
          }`}
          onClick={() => setOpenEditEmail(true)}>
          Edit
        </button> */}
      </div>
      {/* end of Email */}
    </div>
  );
};

export default EditProfile;
