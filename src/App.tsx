import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { User, Position, RegisterField } from './types/types';
import { getPositions, getUsers } from './api/api';
import './styles/styles.scss';

const App: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [positions, setPositions] = React.useState<Position[]>([]);

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [position, setPosition] = React.useState<string>('');
  const [photoName, setPhotoName] = React.useState<string>('');

  const { register, handleSubmit } = useForm<RegisterField>();

  const onSubmit: SubmitHandler<RegisterField> = data => {
    console.log(data)
  }

  const updateData = async () => {
    const usersFromServer = await getUsers(7, 6);
    const positionsFromServer = await getPositions();

    setUsers(usersFromServer.users);
    setPositions(positionsFromServer.positions);
  }

  React.useEffect(() => {
    updateData();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  }


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const correctPhotoName = e.target.value.split('\\')[2];

    setPhotoName(correctPhotoName);
  }

  const isFormFilled = () => {
    if (name && email && phone && position && photoName) {
      return true;
    }

    return false;
  }

  return (
    <div className="App">
      <header className="header">
        <div className='header__container'>
          <div className='header__logo'>
            <svg width="104" height="26" viewBox="0 0 104 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.7786 22.6036C28.9167 23.5978 28.5404 24.5473 27.859 25.1424C27.7324 25.2542 27.5954 25.3523 27.4492 25.4366C27.3169 25.5119 27.1788 25.5768 27.0326 25.6281C26.7012 25.7455 26.3559 25.7888 26.0163 25.7672C26.0071 25.7672 25.9979 25.7672 25.9887 25.7649C25.3051 25.7159 24.6467 25.4058 24.1806 24.9099C23.4244 24.1062 23.4463 23.1075 23.4554 22.8989C23.4554 22.7985 23.4601 22.7006 23.4716 22.6036H15.2538C15.2654 22.7006 15.2699 22.7985 15.2699 22.8989C15.2792 23.1075 15.3011 24.1062 14.5449 24.9099C14.0787 25.4058 13.4204 25.7159 12.7368 25.7649C12.7275 25.7672 12.7183 25.7672 12.709 25.7672C12.3696 25.7888 12.0243 25.7455 11.6929 25.6281C11.5466 25.5768 11.4085 25.5119 11.2762 25.4366C11.13 25.3523 10.993 25.2542 10.8664 25.1436C10.8653 25.1436 10.8653 25.1424 10.8653 25.1424C10.1851 24.5462 9.80871 23.5978 9.94683 22.6036H6.9866C7.00616 22.5306 7.02688 22.4566 7.04645 22.3836C7.41475 21.0281 7.78305 19.6715 8.15136 18.3159L8.39305 18.3045L11.2209 18.1792C11.3487 18.1735 11.4465 18.0674 11.4408 17.942C11.435 17.8154 11.3303 17.7174 11.2002 17.7243L8.5185 17.8428L8.27796 17.8542C8.41147 17.3595 8.54613 16.8658 8.67964 16.3722L8.91328 16.3916L11.1841 16.5796H11.2037C11.3222 16.5796 11.4235 16.4896 11.4327 16.371C11.4431 16.2457 11.3498 16.135 11.2232 16.1247L9.03528 15.9435L8.80164 15.9241C8.93744 15.4237 9.07327 14.9232 9.20907 14.4238L9.42544 14.507L11.58 15.3313C11.6065 15.3416 11.6353 15.3473 11.6629 15.3473C11.7549 15.3473 11.8424 15.2914 11.877 15.2014C11.923 15.0839 11.8643 14.9517 11.7457 14.9061L9.5463 14.0635L9.32992 13.9815C10.5235 9.58778 11.7181 5.19409 12.9117 0.801514C13.7738 3.42816 14.6346 6.05481 15.4955 8.68032C16.1033 8.37479 17.5201 7.74891 19.3546 7.77741H19.3708C21.2053 7.74891 22.6222 8.37479 23.2299 8.68032C24.0908 6.05481 24.9517 3.42816 25.8138 0.801514C27.0073 5.19409 28.202 9.58778 29.3955 13.9815L29.1792 14.0635L26.9797 14.9061C26.8611 14.9517 26.8012 15.0839 26.8473 15.2014C26.883 15.2914 26.9704 15.3473 27.0626 15.3473C27.0902 15.3473 27.1178 15.3416 27.1454 15.3313L29.2999 14.507L29.5164 14.4238C29.6521 14.9232 29.788 15.4237 29.9237 15.9241L29.6901 15.9435L27.5022 16.1247C27.3756 16.135 27.2812 16.2457 27.2915 16.371C27.3019 16.4896 27.4032 16.5796 27.5206 16.5796H27.5402L29.8122 16.3916L30.0458 16.3722C30.1793 16.8658 30.3139 17.3595 30.4474 17.8542L30.2069 17.8428L27.5241 17.7243C27.3941 17.7196 27.2893 17.8154 27.2836 17.942C27.2777 18.0674 27.3768 18.1735 27.5034 18.1792L30.3324 18.3045L30.5741 18.3159C30.9424 19.6715 31.3107 21.0281 31.679 22.3836C31.6986 22.4566 31.7192 22.5306 31.7388 22.6036H28.7786Z" fill="#F4E041"/>
              <path d="M32.0381 22.8316L31.9783 22.6127L31.9161 22.3835L30.8135 18.3261L30.5741 18.3159L30.3324 18.3045L31.4384 22.3755H28.5139L28.5496 22.6344C28.6589 23.4175 28.4241 24.1768 27.9534 24.724C27.8636 24.8289 27.7646 24.9258 27.6587 25.0124C27.6266 25.0398 27.5931 25.066 27.5598 25.09C27.4907 25.1424 27.4194 25.1892 27.3445 25.2313C27.2214 25.3032 27.0914 25.3647 26.9543 25.4126C26.7265 25.4935 26.4893 25.5368 26.2512 25.5437C26.1728 25.546 26.0946 25.5437 26.0164 25.5391C25.9404 25.5346 25.8644 25.5254 25.7885 25.5129C25.2498 25.4274 24.7353 25.1652 24.3487 24.7537C23.7064 24.0707 23.6707 23.2363 23.6857 22.8988C23.6857 22.7997 23.6903 22.7118 23.6995 22.6297L23.7294 22.3755H14.9949L15.0248 22.6297C15.034 22.7118 15.0398 22.7997 15.0398 22.9079C15.0536 23.2363 15.0179 24.0707 14.3756 24.7537C13.989 25.1652 13.4745 25.4274 12.937 25.5129C12.8611 25.5254 12.7851 25.5346 12.7091 25.5391C12.6309 25.5437 12.5526 25.546 12.4743 25.5437C12.235 25.5368 11.9978 25.4935 11.7699 25.4126C11.6341 25.3647 11.5041 25.3043 11.3821 25.2325H11.3809C11.3061 25.1902 11.2336 25.1424 11.1646 25.09C11.1312 25.066 11.0978 25.0398 11.0656 25.0124C10.9597 24.9258 10.8607 24.8289 10.7709 24.724C10.3002 24.1768 10.0654 23.4175 10.1747 22.6344L10.2104 22.3755H7.28702L8.39307 18.3045L8.15138 18.3159L7.91082 18.3261L6.80822 22.3835L6.74607 22.6127L6.68622 22.8316H9.69249C9.61653 24.1711 10.3946 25.4115 11.6146 25.8424C12.6769 26.2186 13.9222 25.9063 14.713 25.0649C15.4737 24.2554 15.5162 23.2728 15.5002 22.8988C15.5002 22.876 15.499 22.8532 15.499 22.8316H23.2254V22.8886C23.2081 23.2728 23.2506 24.2554 24.0115 25.0649C24.5799 25.6691 25.381 25.9997 26.1809 25.9997C26.4952 25.9997 26.8094 25.9484 27.1097 25.8424C28.3297 25.4115 29.1078 24.1711 29.0319 22.8316H32.0381ZM8.67966 16.372L8.44602 16.3527L8.03629 17.8644L8.27798 17.8541L8.51853 17.8428L8.9133 16.3914L8.67966 16.372ZM25.8346 0L25.5939 0.730765C24.8758 2.92191 24.1564 5.11308 23.4383 7.30309L23.0918 8.3599C22.2159 7.95177 20.9176 7.52197 19.3708 7.54933H19.3582C17.8067 7.52426 16.5084 7.95177 15.6326 8.3599L15.2861 7.30309C14.5679 5.11308 13.8497 2.92191 13.1304 0.730765L12.8899 0L9.11357 13.8982L9.32995 13.9815L9.54632 14.0635L12.9324 1.60176C13.5712 3.55007 14.2099 5.49727 14.8475 7.44445L15.3598 9.00402L15.5991 8.88317C16.4232 8.4682 17.748 7.97571 19.3547 8.00535H19.3742C20.9855 7.97799 22.3011 8.4682 23.1252 8.88317L23.3657 9.00402L23.8768 7.44445C24.5144 5.49727 25.1531 3.55007 25.793 1.60176L29.1791 14.0635L29.3955 13.9815L29.6108 13.8982L25.8346 0ZM8.99271 14.3406L8.56802 15.9046L8.80166 15.924L9.0353 15.9434L9.42548 14.507L9.20909 14.4238L8.99271 14.3406ZM29.7316 14.3416L29.5164 14.4238L29.3 14.507L29.6902 15.9434L29.9238 15.924L30.1564 15.9058L29.7316 14.3416ZM30.2783 16.3527L30.0459 16.372L29.8121 16.3914L30.207 17.8428L30.4475 17.8541L30.688 17.8644L30.2783 16.3527Z" fill="black" fillOpacity="0.87"/>
              <path d="M21.1868 14.9493C20.9163 14.9493 20.6977 14.7326 20.6977 14.4647V11.528C20.6977 11.2601 20.9163 11.0435 21.1868 11.0435C21.4572 11.0435 21.6759 11.2601 21.6759 11.528V14.4647C21.6759 14.7315 21.4572 14.9493 21.1868 14.9493Z" fill="black" fillOpacity="0.87"/>
              <path d="M17.8256 14.4365C17.5573 14.4649 17.3157 14.2722 17.2869 14.0055L17.0486 11.7893C17.0198 11.5236 17.2144 11.2842 17.4837 11.2557C17.7519 11.2272 17.9936 11.4199 18.0224 11.6867L18.2605 13.9029C18.2894 14.1696 18.0948 14.4079 17.8256 14.4365Z" fill="black" fillOpacity="0.87"/>
              <path d="M11.875 15.2013C11.8405 15.2914 11.753 15.3472 11.6609 15.3472C11.6333 15.3472 11.6045 15.3416 11.5781 15.3313L9.4235 14.507L9.20712 14.4238L8.99073 14.3406L5.86016 13.1424C5.74047 13.0968 5.68177 12.9646 5.7278 12.8471C5.77385 12.7297 5.90735 12.6716 6.0259 12.7172L9.11159 13.8982L9.32797 13.9814L9.54434 14.0635L11.7438 14.9061C11.8624 14.9517 11.921 15.0839 11.875 15.2013Z" fill="black" fillOpacity="0.87"/>
              <path d="M11.4305 16.3708C11.4213 16.4894 11.3201 16.5795 11.2015 16.5795H11.1819L8.91112 16.3914L8.67748 16.372L8.44384 16.3526L5.07273 16.0733C4.94612 16.063 4.85174 15.9525 4.86326 15.827C4.8736 15.7017 4.98295 15.6081 5.11185 15.6196L8.56584 15.9046L8.79948 15.9239L9.03312 15.9433L11.2211 16.1246C11.3477 16.1348 11.4409 16.2455 11.4305 16.3708Z" fill="black" fillOpacity="0.87"/>
              <path d="M11.4389 17.9422C11.4447 18.0677 11.3468 18.1736 11.2191 18.1793L8.3912 18.3047L8.14951 18.3162L7.90896 18.3264L5.09489 18.4519H5.08453C4.96253 18.4519 4.8601 18.356 4.8555 18.2341C4.84974 18.1075 4.94757 18.0015 5.07417 17.9958L8.0344 17.8647L8.2761 17.8545L8.51665 17.8431L11.1984 17.7245C11.3284 17.7176 11.4331 17.8157 11.4389 17.9422Z" fill="black" fillOpacity="0.87"/>
              <path d="M32.8614 13.1424L29.7297 14.3417L29.5144 14.4238L29.2981 14.507L27.1435 15.3313C27.1159 15.3416 27.0882 15.3472 27.0606 15.3472C26.9686 15.3472 26.881 15.2914 26.8454 15.2013C26.7994 15.0839 26.8592 14.9517 26.9777 14.9061L29.1772 14.0635L29.3936 13.9814L29.6088 13.8982L32.6956 12.7172C32.813 12.6716 32.9477 12.7297 32.9938 12.8471C33.0387 12.9646 32.98 13.0968 32.8614 13.1424Z" fill="black" fillOpacity="0.87"/>
              <path d="M33.8567 15.8273C33.867 15.9527 33.7727 16.0633 33.646 16.0735L30.2749 16.3529L30.0424 16.3723L29.8088 16.3916L27.5368 16.5797H27.5173C27.3999 16.5797 27.2986 16.4897 27.2882 16.3711C27.2778 16.2457 27.3723 16.1351 27.4988 16.1248L29.6868 15.9436L29.9204 15.9242L30.1529 15.906L33.608 15.6198C33.7347 15.6072 33.8463 15.7018 33.8567 15.8273Z" fill="black" fillOpacity="0.87"/>
              <path d="M33.865 18.2338C33.8591 18.3558 33.7579 18.4516 33.6348 18.4516H33.6243L30.8103 18.3262L30.571 18.3159L30.3293 18.3045L27.5003 18.1792C27.3736 18.1734 27.2746 18.0674 27.2803 17.942C27.2862 17.8154 27.3908 17.7196 27.521 17.7243L30.2038 17.8428L30.4443 17.8542L30.6848 17.8645L33.6452 17.9955C33.7728 18.0012 33.8707 18.1073 33.865 18.2338Z" fill="black" fillOpacity="0.87"/>
              <path d="M25.9208 23.5796C26.0087 23.8304 26.0849 24.136 26.1092 24.486C26.1381 24.8976 26.0861 25.2555 26.0144 25.5393L25.9208 23.5796Z" fill="white"/>
              <path d="M26.0154 25.7672C25.997 25.7672 25.9785 25.7649 25.9602 25.7604C25.8371 25.7306 25.7611 25.6064 25.7922 25.4845C25.8727 25.1595 25.9027 24.8289 25.8796 24.5017C25.86 24.2178 25.8002 23.9328 25.7035 23.6546C25.662 23.5361 25.7254 23.4061 25.8462 23.3651C25.9671 23.324 26.0971 23.3867 26.1385 23.5065C26.249 23.8222 26.3158 24.1471 26.3388 24.4709C26.3653 24.846 26.3307 25.2233 26.2387 25.595C26.2122 25.6976 26.1178 25.7672 26.0154 25.7672Z" fill="black" fillOpacity="0.87"/>
              <path d="M27.4217 23.4893C27.5627 23.7139 27.6853 23.9874 27.7234 24.3009C27.7697 24.6692 27.6865 24.9896 27.572 25.2449L27.4217 23.4893Z" fill="white"/>
              <path d="M27.5715 25.4718C27.5404 25.4718 27.5093 25.465 27.4782 25.4524C27.362 25.4011 27.309 25.2666 27.3608 25.1515C27.4829 24.8779 27.5266 24.6008 27.4932 24.3272C27.4632 24.0878 27.3736 23.8461 27.2251 23.6078C27.1583 23.5007 27.1916 23.3604 27.2999 23.2943C27.4081 23.2282 27.5497 23.2613 27.6164 23.3684C27.8006 23.6625 27.9121 23.967 27.9501 24.2725C27.9939 24.6282 27.9375 24.9862 27.7821 25.3361C27.7441 25.4217 27.6601 25.4718 27.5715 25.4718Z" fill="black" fillOpacity="0.87"/>
              <path d="M12.803 23.5796C12.7152 23.8304 12.6388 24.136 12.6145 24.486C12.5857 24.8976 12.6377 25.2555 12.7093 25.5393L12.803 23.5796Z" fill="white"/>
              <path d="M12.707 25.7673C12.6035 25.7673 12.5102 25.6976 12.4838 25.594C12.3916 25.2235 12.3571 24.845 12.3836 24.4698C12.4054 24.145 12.4734 23.8211 12.5839 23.5054C12.6254 23.3868 12.7566 23.3229 12.8762 23.364C12.9959 23.405 13.0603 23.535 13.0189 23.6536C12.9222 23.9317 12.8624 24.2156 12.8429 24.5006C12.8198 24.8278 12.8498 25.1585 12.9303 25.4834C12.9602 25.6054 12.8854 25.7296 12.7623 25.7593C12.7438 25.765 12.7255 25.7673 12.707 25.7673Z" fill="black" fillOpacity="0.87"/>
              <path d="M11.3021 23.4893C11.1611 23.7139 11.0386 23.9874 11.0004 24.3009C10.9542 24.6692 11.0374 24.9896 11.1518 25.2449L11.3021 23.4893Z" fill="white"/>
              <path d="M11.1509 25.4718C11.0622 25.4718 10.9782 25.4205 10.9402 25.3361C10.7849 24.9872 10.7273 24.6293 10.7722 24.2725C10.8102 23.967 10.9218 23.6637 11.106 23.3684C11.1727 23.2613 11.3143 23.2282 11.4225 23.2943C11.5307 23.3604 11.5641 23.5007 11.4973 23.6078C11.3488 23.845 11.2591 24.0878 11.2291 24.3272C11.1958 24.6008 11.2395 24.8779 11.3615 25.1515C11.4133 25.2666 11.3604 25.4011 11.2441 25.4524C11.213 25.4661 11.1819 25.4718 11.1509 25.4718Z" fill="black" fillOpacity="0.87"/>
              <path d="M8.35528 22.7985H0.244843C0.11018 22.7985 0 22.7111 0 22.6045C0 22.4977 0.11018 22.4104 0.244843 22.4104H8.35528C8.48994 22.4104 8.60012 22.4977 8.60012 22.6045C8.60012 22.7111 8.48994 22.7985 8.35528 22.7985Z" fill="black" fillOpacity="0.87"/>
              <path d="M37.8844 22.8395H30.2593C30.1327 22.8395 30.0291 22.737 30.0291 22.6115C30.0291 22.4862 30.1327 22.3835 30.2593 22.3835H37.8844C38.011 22.3835 38.1145 22.4862 38.1145 22.6115C38.1145 22.737 38.0121 22.8395 37.8844 22.8395Z" fill="black" fillOpacity="0.87"/>
              <path d="M21.7043 18.6444C21.5385 19.0707 21.1553 19.5324 20.6685 19.6021C20.2184 19.6647 19.8041 19.4264 19.506 19.0559C19.4773 19.1345 19.4416 19.2155 19.3955 19.2964C19.3207 19.4288 18.9191 20.083 18.2492 20.083H18.2307C17.5931 20.0717 17.0396 19.496 16.9429 18.7424C16.9279 18.617 17.0166 18.503 17.1431 18.4881C17.2675 18.4722 17.3849 18.5611 17.3998 18.6854C17.4735 19.2668 17.8844 19.6213 18.2388 19.6271H18.248C18.6705 19.6271 18.9616 19.1312 18.9939 19.0742C19.1527 18.7914 19.1492 18.5018 19.1204 18.3115C19.1101 18.2762 19.1009 18.2408 19.0916 18.2055C18.6486 18.2568 18.2665 18.1029 18.1962 17.8223C18.1168 17.5032 18.4725 17.1407 18.9915 17.013C19.5118 16.8853 19.9975 17.0403 20.0769 17.3596C20.1436 17.6229 19.9146 17.9147 19.5417 18.0812C19.5531 18.1233 19.5635 18.1736 19.5728 18.2282C19.7592 18.8416 20.2358 19.2007 20.604 19.1505C20.8895 19.1094 21.1576 18.7822 21.2738 18.4813C21.3729 18.2259 21.3591 17.9854 21.3303 17.8292C21.3084 17.705 21.3912 17.5864 21.5155 17.5636C21.6421 17.5419 21.7607 17.624 21.7837 17.7471C21.8229 17.9615 21.8413 18.2898 21.7043 18.6444Z" fill="black" fillOpacity="0.87"/>
              <path d="M43.8069 18.588C43.4134 18.588 43.2167 18.4796 43.2167 18.2628V9.33509H40.3838C40.2854 9.33509 40.2117 9.3006 40.1625 9.23162C40.1133 9.16264 40.0887 9.04932 40.0887 8.89166V8.65516C40.0887 8.4975 40.1133 8.38418 40.1625 8.3152C40.2117 8.24622 40.2854 8.21173 40.3838 8.21173H47.3037C47.4119 8.21173 47.4857 8.24622 47.525 8.3152C47.5742 8.38418 47.5988 8.4975 47.5988 8.65516V8.89166C47.5988 9.04932 47.5742 9.16264 47.525 9.23162C47.4857 9.3006 47.4119 9.33509 47.3037 9.33509H44.5151V18.2628C44.5151 18.4796 44.3184 18.588 43.9249 18.588H43.8069ZM49.7799 18.5584C49.6226 18.5584 49.5094 18.5239 49.4406 18.455C49.3717 18.386 49.3373 18.2727 49.3373 18.115V8.65516C49.3373 8.4975 49.3717 8.38418 49.4406 8.3152C49.5094 8.24622 49.6226 8.21173 49.7799 8.21173H54.9293C55.0375 8.21173 55.1112 8.24622 55.1506 8.3152C55.1998 8.38418 55.2244 8.4975 55.2244 8.65516V8.89166C55.2244 9.04932 55.1998 9.16264 55.1506 9.23162C55.1112 9.3006 55.0375 9.33509 54.9293 9.33509H50.6357V12.7052H54.4866C54.5948 12.7052 54.6686 12.7396 54.708 12.8086C54.7571 12.8776 54.7817 12.9909 54.7817 13.1486V13.3851C54.7817 13.5427 54.7571 13.6561 54.708 13.725C54.6686 13.794 54.5948 13.8285 54.4866 13.8285H50.6357V17.4351H54.9441C55.0522 17.4351 55.126 17.4696 55.1654 17.5385C55.2145 17.6075 55.2392 17.7208 55.2392 17.8785V18.115C55.2392 18.2727 55.2145 18.386 55.1654 18.455C55.126 18.5239 55.0522 18.5584 54.9441 18.5584H49.7799ZM59.546 18.6471C58.9558 18.6471 58.4099 18.5781 57.9083 18.4402C57.4066 18.3022 57.0279 18.1347 56.7722 17.9376C56.5852 17.7997 56.4918 17.6765 56.4918 17.5681C56.4918 17.4499 56.5557 17.2873 56.6836 17.0803C56.8213 16.8734 56.9294 16.7699 57.0082 16.7699C57.0475 16.7699 57.1508 16.8192 57.3181 16.9177C57.6229 17.0852 57.9475 17.2281 58.2919 17.3464C58.646 17.4646 59.064 17.5238 59.546 17.5238C60.1164 17.5238 60.5788 17.3661 60.933 17.0508C61.2968 16.7256 61.4789 16.3019 61.4789 15.7796C61.4789 15.415 61.3805 15.1145 61.1838 14.878C60.987 14.6316 60.746 14.4395 60.4608 14.3015C60.1853 14.1537 59.7821 13.9763 59.2509 13.7694C58.6804 13.5427 58.2278 13.3358 57.8935 13.1486C57.559 12.9614 57.2738 12.6855 57.0377 12.3208C56.8017 11.9464 56.6836 11.4586 56.6836 10.8575C56.6836 10.3254 56.8164 9.85242 57.082 9.43856C57.3573 9.02469 57.7409 8.70443 58.2329 8.47779C58.7345 8.2413 59.31 8.12305 59.9592 8.12305C60.2935 8.12305 60.6674 8.17232 61.0805 8.27086C61.4936 8.35954 61.8132 8.48272 62.0395 8.64038C62.2362 8.75863 62.3346 8.88673 62.3346 9.02469C62.3346 9.13308 62.2706 9.29075 62.1428 9.49768C62.0248 9.70461 61.9312 9.80808 61.8625 9.80808C61.8132 9.80808 61.7394 9.78344 61.6412 9.73418C61.5526 9.68491 61.4936 9.65041 61.4641 9.63071C60.9722 9.3745 60.4608 9.2464 59.9296 9.2464C59.3591 9.2464 58.8968 9.39421 58.5427 9.68983C58.1983 9.98545 58.0263 10.3944 58.0263 10.9167C58.0263 11.2517 58.1098 11.5227 58.2771 11.7296C58.4542 11.9365 58.6509 12.0942 58.8673 12.2026C59.0935 12.3011 59.482 12.4588 60.0329 12.6756C60.6231 12.9022 61.105 13.1239 61.4789 13.3407C61.8526 13.5477 62.1673 13.8531 62.4232 14.2572C62.6887 14.6513 62.8215 15.1588 62.8215 15.7796C62.8215 16.6665 62.5264 17.3661 61.9363 17.8785C61.3461 18.3909 60.5493 18.6471 59.546 18.6471ZM67.3364 18.588C66.9429 18.588 66.7463 18.4796 66.7463 18.2628V9.33509H63.9134C63.815 9.33509 63.7412 9.3006 63.6921 9.23162C63.6428 9.16264 63.6183 9.04932 63.6183 8.89166V8.65516C63.6183 8.4975 63.6428 8.38418 63.6921 8.3152C63.7412 8.24622 63.815 8.21173 63.9134 8.21173H70.8333C70.9414 8.21173 71.0152 8.24622 71.0546 8.3152C71.1037 8.38418 71.1284 8.4975 71.1284 8.65516V8.89166C71.1284 9.04932 71.1037 9.16264 71.0546 9.23162C71.0152 9.3006 70.9414 9.33509 70.8333 9.33509H68.0447V18.2628C68.0447 18.4796 67.8478 18.588 67.4545 18.588H67.3364ZM75.4341 18.588C75.0407 18.588 74.8439 18.4796 74.8439 18.2628V9.33509H72.011C71.9127 9.33509 71.839 9.3006 71.7897 9.23162C71.7405 9.16264 71.7159 9.04932 71.7159 8.89166V8.65516C71.7159 8.4975 71.7405 8.38418 71.7897 8.3152C71.839 8.24622 71.9127 8.21173 72.011 8.21173H78.9309C79.0392 8.21173 79.113 8.24622 79.1522 8.3152C79.2015 8.38418 79.226 8.4975 79.226 8.65516V8.89166C79.226 9.04932 79.2015 9.16264 79.1522 9.23162C79.113 9.3006 79.0392 9.33509 78.9309 9.33509H76.1423V18.2628C76.1423 18.4796 75.9456 18.588 75.5521 18.588H75.4341ZM79.7393 18.588C79.3164 18.588 79.1048 18.5042 79.1048 18.3367C79.1048 18.2874 79.1196 18.2185 79.1491 18.1298L82.6459 8.41867C82.705 8.261 82.9018 8.18217 83.2361 8.18217H83.664C84.0181 8.18217 84.2149 8.261 84.2542 8.41867L87.751 18.1446C87.7805 18.2135 87.7953 18.2776 87.7953 18.3367C87.7953 18.5042 87.5839 18.588 87.1608 18.588H87.0428C86.6986 18.588 86.5019 18.5092 86.4526 18.3515L85.5821 15.9274H81.2443L80.4032 18.3515C80.3541 18.5092 80.1574 18.588 79.8131 18.588H79.7393ZM85.1837 14.8041L83.6345 10.3993C83.5854 10.2417 83.5263 9.95589 83.4574 9.54202H83.4279C83.3493 9.93619 83.2755 10.2219 83.2066 10.3993L81.6574 14.8041H85.1837ZM91.5767 18.6471C90.9866 18.6471 90.4406 18.5781 89.939 18.4402C89.4373 18.3022 89.0586 18.1347 88.8029 17.9376C88.6159 17.7997 88.5225 17.6765 88.5225 17.5681C88.5225 17.4499 88.5864 17.2873 88.7144 17.0803C88.852 16.8734 88.9602 16.7699 89.039 16.7699C89.0782 16.7699 89.1815 16.8192 89.3488 16.9177C89.6536 17.0852 89.9782 17.2281 90.3226 17.3464C90.6767 17.4646 91.0947 17.5238 91.5767 17.5238C92.1472 17.5238 92.6096 17.3661 92.9637 17.0508C93.3275 16.7256 93.5096 16.3019 93.5096 15.7796C93.5096 15.415 93.4112 15.1145 93.2145 14.878C93.0177 14.6316 92.7767 14.4395 92.4915 14.3015C92.2161 14.1537 91.8128 13.9763 91.2817 13.7694C90.7111 13.5427 90.2586 13.3358 89.9241 13.1486C89.5897 12.9614 89.3045 12.6855 89.0685 12.3208C88.8324 11.9464 88.7144 11.4586 88.7144 10.8575C88.7144 10.3254 88.8471 9.85242 89.1127 9.43856C89.3881 9.02469 89.7717 8.70443 90.2636 8.47779C90.7652 8.2413 91.3407 8.12305 91.9899 8.12305C92.3242 8.12305 92.6981 8.17232 93.1112 8.27086C93.5243 8.35954 93.8439 8.48272 94.0703 8.64038C94.2669 8.75863 94.3654 8.88673 94.3654 9.02469C94.3654 9.13308 94.3013 9.29075 94.1735 9.49768C94.0555 9.70461 93.962 9.80808 93.8932 9.80808C93.8439 9.80808 93.7702 9.78344 93.6719 9.73418C93.5834 9.68491 93.5244 9.65041 93.4948 9.63071C93.0029 9.3745 92.4915 9.2464 91.9604 9.2464C91.3898 9.2464 90.9275 9.39421 90.5734 9.68983C90.2291 9.98545 90.057 10.3944 90.057 10.9167C90.057 11.2517 90.1405 11.5227 90.3078 11.7296C90.4849 11.9365 90.6816 12.0942 90.898 12.2026C91.1242 12.3011 91.5127 12.4588 92.0636 12.6756C92.6538 12.9022 93.1357 13.1239 93.5096 13.3407C93.8833 13.5477 94.198 13.8531 94.4539 14.2572C94.7195 14.6513 94.8523 15.1588 94.8523 15.7796C94.8523 16.6665 94.5572 17.3661 93.967 17.8785C93.3768 18.3909 92.5801 18.6471 91.5767 18.6471ZM97.3753 18.588C96.9818 18.588 96.7851 18.4796 96.7851 18.2628V8.50735C96.7851 8.29056 96.9818 8.18217 97.3753 8.18217H97.4933C97.8867 8.18217 98.0835 8.29056 98.0835 8.50735V13.0303H98.1425L101.772 8.38911C101.88 8.25115 102.146 8.18217 102.569 8.18217H102.716C102.884 8.18217 103.012 8.20188 103.1 8.2413C103.189 8.27086 103.233 8.3152 103.233 8.37432C103.233 8.46301 103.184 8.56155 103.085 8.66994L99.3967 13.2816L103.867 18.1446C103.956 18.2431 104 18.3219 104 18.3811C104 18.4599 103.951 18.5141 103.853 18.5436C103.754 18.5732 103.587 18.588 103.351 18.588H103.174C102.957 18.588 102.785 18.5781 102.657 18.5584C102.539 18.5387 102.441 18.4845 102.362 18.3958L98.1425 13.6364H98.0835V18.2628C98.0835 18.4796 97.8867 18.588 97.4933 18.588H97.3753Z" fill="black" fillOpacity="0.87"/>
            </svg>
          </div>
          <nav className='header__nav nav'>
            <button className='nav__item button'>
              Users
            </button>
            <button className='nav__item button'>
              Sign up
            </button>
          </nav>
        </div>
      </header>

      <main className='main'>
        <section className='main__landscape landscape'>
          <article className='landscape__content'>
            <h1 className='landscape__header'>
              Test assignment for front-end developer
            </h1>
            <p className='landscape__paragraph'>
              What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </p>
            <button className='button'>
              Sign up
            </button>
          </article>
        </section>

        <section className='team'>
          <h1 className='team__title'>
            Working with GET request
          </h1>

          <div className='team__list'>
            {users.map(user => {
              return (
                <div className='team__card card' key={user.id}>
                  <img
                    className='card__photo'
                    src={user.photo}
                    alt="user"
                  />
                  <p className='card__name'>{user.name}</p>
                  <p className='card__position'>{user.position}</p>
                  <p className='card__email'>{user.email}</p>
                  <p className='card__phone'>{user.phone}</p>
                </div>
              );
            })}
          </div>

          <button className='team__button button'>
            Show more
          </button>
        </section>

        <section className='contact'>
          <h1 className='contact__title'>
            Working with POST request
          </h1>

          <form
            className='contact__form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className='contact__nameInput input'
              {...register('name')}
              value={name}
              onChange={handleNameChange}
              type="text"
              placeholder='Your name'
            />

            <input
              className='contact__emailInput input'
              {...register('email')}
              type="text"
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
            />

            <input
              className='contact__phoneInput input'
              {...register('phone')}
              type="text"
              placeholder='Phone'
              value={phone}
              onChange={handlePhoneChange}
            />

            <div className='contact__phoneTip'>
              +38 (xxx) xxx - xx - xx
            </div>

            <div className='contact__position position'>
              <p className='position__title'>
                Select your position
              </p>

              {positions.map(position => {
                return (
                  <label className='position__select' key={position.name}>
                    <input
                      {...register('position')}
                      type='radio'
                      value={position.name}
                      onChange={handlePositionChange}
                    />
                    {position.name}
                  </label>
                );
              })}
            </div>
            
            <label
              className='contact__photo'
              htmlFor='upload'
            >
              <div
                className='contact__uploadButton'
              >
                Upload
              </div>

              <input
                className='contact__photoPath input'
                type="text"
                value={photoName}
                placeholder="Upload your photo"
                disabled
              />

              <input
                className='contact__hiddenFileInput'
                {...register("photo")}
                id="upload"
                type="file"
                name="photo"
                accept='image/*'
                onChange={handlePhotoChange}
              />
            </label>

            <button
              className='button'
              disabled={!isFormFilled()}
            >
              Sing up
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;
