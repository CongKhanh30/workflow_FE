import React, {useEffect, useState} from 'react';
import teamService from "../service/TeamService";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import permissionService from "../service/PermissionService";
import {toast} from "react-toastify";
import boardService from "../service/BoardService";
import boardsSlice from "../../redux/boardsSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const HomeTeams = () => {

    const validationSchema = Yup.object({
        teamId: Yup.string()
            .required('Vui lòng nhập id')
            .min(0, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(10, 'Tên đăng nhập không được quá 15 ký tự'),

        username: Yup.string()
            .required('Vui lòng nhập tên đăng nhập')
            .min(3, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(15, 'Tên đăng nhập không được quá 15 ký tự'),

        permissionId: Yup.string()
            .required('Vui lòng chon')
            .min(0, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(10, 'Tên đăng nhập không được quá 15 ký tự'),
    });

    const [listTeam, setListTeam] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
            teamService.getAllTeam().then(res => {
                setListTeam(res);
            }).catch(err => {
                console.log(err);
            });
        }, [load]
    );

    const [listPermission, setPermission] = useState([]);
    useEffect(() => {
            permissionService.getAllPermission().then(res => {
                setPermission(res);
            }).catch(err => {
                console.log(err);
            });
        }
    );

    const removeTeam = (id) => {
        const confirm = window.confirm("Bạn có muốn xóa nhóm này?");
        if (confirm === true) {
            teamService.removeTeam(id).then(res => {
                toast.success("Xóa Nhóm Thành Công !")
                setLoad(!load);
            }).catch(err => {
                console.log(err);
            });
        }
    }
    const navigate = useNavigate();

    const [idAddMember, setIdAddMember] = useState('');
    const addMember = (id) => {
        setIdAddMember(id);
    }

    const dispatch = useDispatch(); // khởi tạo dispatch dùng để dispatch action
    // dispatch dùng để tự động gọi action setBoard trong redux, tự động thay đổi state boards

    const showBoard = (id) => {
        boardService.getAllBoardByTeamId(id).then(res => { // res là kết quả trả về sau khi call API
                if (res.length > 0) { // nếu res có dữ liệu
                    res = res?.map((board) => { // duyệt qua từng board trong res
                        return {...board, isActive: false} // và khi trả về sẽ set từng phần tử trong res có key isActive = false
                    })

                    res[0].isActive = true; // set phần tử đầu tiên của res có key isActive = true
                    // để mặc định khi vào trang sẽ hiển thị board đầu tiên

                    dispatch(boardsSlice.actions.setBoard(res)); // sau khi set isActive = true cho board dau tien
                    // thi dispatch action setBoard de set lai state boards trong redux

                    // dispatch dùng để tự động gọi action setBoard trong redux, tự động thay đổi state boards
                    // actions la mot object co key la ten action va value la function dung de set lai state boards

                    navigate("/b/" + id)  // sau khi set xong state boards thì trả về trang board có id là idTeam
                } else {
                    navigate("/b/" + id) // nếu res không có dữ liệu thì trả về trang board có id là idTeam
                }
            }
        )
    }
    const Logout = () => {
            localStorage.removeItem("token");
            navigate("/login");
    }
    return (

        <>
            <style>
                {`
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F9F9F9;
            }
        
            .head {
                font-weight: bold;
            }
            p {
                color: black;
            }
            p:hover{
            color: #5279cb;
            }
            h1 {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 40px;
                color: black;
            }
            #sidebar {
                width: 250px;
                height: 100%;
                background: #CDDAF3;
                position: fixed;
            }
    
            #sidebar ul {
                list-style-type: none;
                padding: 0;
            }
    
            #sidebar ul li {
                padding: 10px;
            }
    
            #sidebar ul li a {
                color: black;
                text-decoration: none;
            }
    
            #content {
                margin-left: 250px;
                padding: 20px;
            }
    
            #content h1 {
                font-size: 24px;
            }
    
            .group-list { 
                margin-top: 20px;
                max-height: 350px; /* Chiều cao tối đa cho danh sách nhóm */
                overflow-y: auto; /* Thanh cuộn dọc */
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }   
            ::-webkit-scrollbar-thumb {
            background: #84abfa; 
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #5279cb; 
            }
            .group-item {
                display: flex;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                padding: 10px;
                background-color: #CDDAF3;
            }
    
            .group-item a {
                
                text-decoration: none;
                color: #333;
            }
    
            .group-item {
                margin-top: 10px;
            }
            
            .group-actions {
                width : 50%;
            }
            
            member-list {
                width : 50%;
                margin-top: 10px;
                border: 1px solid #ddd;
                padding: 10px;
                background-color: #f9f9f9;
            }
    
            .member-list a {
                text-decoration: none;
                color: #333;
            }
            `}
            </style>

            <>
                <div className="modal fade" id="modalAddMember" tabIndex="-1" role="dialog"
                     style={{position: "fixed", zIndex: 9999}}
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm Thành Viên</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <Formik

                                    initialValues={{
                                        teamId: idAddMember,
                                        username: '',
                                        permissionId: ''
                                    }}

                                    enableReinitialize={true}

                                    validationSchema={validationSchema}

                                    onSubmit={
                                        (values) => {
                                            console.log(values)
                                            teamService.addMember(values).then(res => {
                                                toast.success(res);
                                                setLoad(!load);
                                            }).catch(err => {
                                                console.log(err);
                                            });
                                        }}>

                                    <Form>

                                        <div className="modal-footer">
                                            <Field type="hidden" className="form-control" name={'teamId'} id="teamId"
                                            ></Field>
                                            <Field type="text" className="form-control" name={'username'} id="username"
                                            ></Field>
                                            <ErrorMessage name="username" component="div" className="text-danger"/>

                                            <Field as="select" name="permissionId">
                                                <option value="">Chọn một tùy chọn</option>
                                                {listPermission.map((permission) => (
                                                    <option key={permission.id} value={permission.id}>
                                                        {permission.name}
                                                    </option>
                                                ))}
                                            </Field>

                                            <ErrorMessage name="permissionId" component="div" className="text-danger"/>

                                            <button type="submit" className="btn btn-primary"
                                            >Save
                                            </button>
                                        </div>
                                    </Form>

                                </Formik>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="modal fade" id="modalDeleteMember" tabIndex="-1" role="dialog"
                     style={{position: "fixed", zIndex: 9999}}
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm Thành Viên</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <Formik

                                    initialValues={{
                                        teamId: idAddMember,
                                        username: '',
                                        permissionId: ''
                                    }}

                                    enableReinitialize={true}


                                    onSubmit={
                                        (values) => {
                                            console.log(values)
                                            teamService.addMember(values).then(res => {
                                                toast.success(res);
                                                setLoad(!load);
                                            }).catch(err => {
                                                console.log(err);
                                            });
                                        }}>

                                    <Form>

                                        <div className="modal-footer">

                                            <Field type="hidden" className="form-control" name={'teamId'} id="teamId"
                                            ></Field>

                                            <Field type="text" className="form-control" name={'username'} id="username"
                                            ></Field>


                                            <button type="submit" className="btn btn-primary"
                                            >Delete
                                            </button>
                                        </div>
                                    </Form>

                                </Formik>

                            </div>
                        </div>

                    </div>
                </div>


                <div>
                    <div>
                        <div className="container">
                            <h1 className="head">DANH SÁCH NHÓM</h1>
                            <div id="sidebar">
                                <ul>
                                    <li><a href="#">Đổi thông tin cá nhân</a></li>
                                    <Link to={"/changePassword"}>
                                        <li><p>Đổi mật khẩu</p></li>
                                    </Link>
                                    <span onClick={Logout}>
                                        <li><p>Đăng xuất</p></li>
                                    </span>

                                </ul>
                            </div>
                            <div id="content">
                                <Link to={"/createTeam"}>
                                    <button className="btn btn-info">Thêm Nhóm Mới</button>
                                </Link>
                                <div style={{height: "80vh", overflow: "auto", marginTop: "15px"}}>
                                    {listTeam.map((team, index) => {
                                            return (
                                                <div className="group-list">
                                                    <div className="group-item">
                                                        <div className="group-actions">

                                                            {/*<p onClick={() => showBoard(team.id)}>*/}
                                                            {/*    <span style={{*/}
                                                            {/*        fontSize: "1.2rem",*/}
                                                            {/*        paddingLeft: "30px"*/}
                                                            {/*    }}>{team.name}</span><br/>*/}
                                                            {/*</p>*/}
                                                            <Link to={"/board/" + team.id}>
                                                                <p>
                                                                    <span style={{
                                                                        fontSize: "1.2rem",
                                                                        paddingLeft: "30px"
                                                                    }}>{team.name}</span><br/>
                                                                </p>
                                                            </Link>

                                                            <button className="btn btn-pill btn-danger" style={{
                                                                height: "2rem",
                                                                padding: "0.4rem",
                                                                fontSize: "0.8rem"
                                                            }}
                                                                    onClick={() => removeTeam(team.id)}>Delete
                                                            </button>

                                                            <span> </span>

                                                            <button className="btn btn-pill btn-smoke" style={{
                                                            height: "2rem",
                                                            padding: "0.4rem",
                                                            fontSize: "0.8rem"
                                                        }} data-toggle="modal"
                                                                      data-target="#modalAddMember"
                                                                      onClick={() => {
                                                                          addMember(team.id)
                                                                      }
                                                                      }>
                                                            Add Member
                                                        </button>

                                                            <button className="btn btn-pill btn-smoke" style={{
                                                                height: "2rem",
                                                                padding: "0.4rem",
                                                                fontSize: "0.8rem"
                                                            }} data-toggle="modal"
                                                                    data-target="#modalDeleteMember"
                                                                    onClick={() => {
                                                                        addMember(team.id)
                                                                    }
                                                                    }>
                                                                DELETE Member
                                                            </button>


                                                        </div>
                                                        <div className="member-list">
                                                            <p style={{fontSize: "1.2rem"}}>Danh sách thành viên: </p>
                                                            <p>{team.members.map((member, index) => {
                                                                return (
                                                                    <span key={index}>
                                                                {member}<span> </span>
                                                            </span>
                                                                )
                                                            })}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default HomeTeams;