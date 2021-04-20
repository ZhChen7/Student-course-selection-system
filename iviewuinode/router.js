const express = require("express");
const router = express.Router();
const db = require("./models/mysql");

router.get("/", function(req, res, next) {
  return res.status(200).json({
    err_code: 0,
    message: "OK",
    user: req.session.user
  });
});

router.post("/Getlogin", function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let identity = req.body.identity;

  if (identity === "Administrator") {
    let searchbynamesql =
      "SELECT * FROM t_admin\n" +
      "WHERE t_admin.loginname=?\n" +
      "AND t_admin.email=?\n" +
      "AND t_admin.pwd=?\n";
    let searchbynameParams = [name, email, password];
    db.query(searchbynamesql, searchbynameParams, function(result, fields) {
      if (result.length > 0) {
        result[0].identity = "管理员";
        req.session.user = result[0];

        return res.status(200).json({
          result: "ok",
          data1: result[0]
        });
      } else {
        return res.status(200).json({
          result: "error"
        });
      }
    });
  } else if (identity === "teacher") {
    let searchbynamesql =
      "SELECT * FROM t_teacher\n" +
      "WHERE t_teacher.loginname=?\n" +
      "AND t_teacher.email=?\n" +
      "AND t_teacher.pwd=?\n";
    let searchbynameParams = [name, email, password];

    db.query(searchbynamesql, searchbynameParams, function(result, fields) {
      if (result.length > 0) {
        result[0].identity = "老师";
        req.session.user = result[0];

        return res.status(200).json({
          result: "ok",
          data1: result[0]
        });
      } else {
        return res.status(200).json({
          result: "error"
        });
      }
    });
  } else {
    let searchbynamesql =
      "SELECT * FROM t_student\n" +
      "WHERE t_student.sname=?\n" +
      "AND t_student.email=?\n" +
      "AND t_student.pwd=?\n";
    let searchbynameParams = [name, email, password];

    db.query(searchbynamesql, searchbynameParams, function(result, fields) {
      if (result.length > 0) {
        result[0].identity = "学生";
        req.session.user = result[0];

        return res.status(200).json({
          result: "ok",
          data1: result[0]
        });
      } else {
        return res.status(200).json({
          result: "error"
        });
      }
    });
  }
});

router.get("/out", function(req, res) {
  req.session.destroy();
  return res.status(200).json({
    result: "ok"
  });
});

router.post("/fix", function(req, res, next) {
  console.log(req.body);

  if (req.body.identity === "老师") {
    let updatasql = "UPDATE  t_teacher SET loginname = ?,pwd=? WHERE tno = ?";
    let updataSqlParams = [req.body.name, req.body.password, req.body.ano];

    db.query(updatasql, updataSqlParams, (err, results) => {
      if (err) {
        console.log(err);
      }

      let fixsql = "SELECT * FROM t_teacher WHERE tno = ?";
      let fixSqlParams = req.body.ano;
      db.query(fixsql, fixSqlParams, result => {
        result[0].identity = "老师";
        req.session.user = result[0];

        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    });
  } else if (req.body.identity === "管理员") {
    let updatasql = "UPDATE t_admin SET loginname = ?,pwd=? WHERE ano = ?";
    let updataSqlParams = [req.body.name, req.body.password, req.body.ano];

    db.query(updatasql, updataSqlParams, (err, results) => {
      if (err) {
        console.log(err);
      }

      fixsql = "SELECT * FROM t_admin WHERE ano = ?";
      fixSqlParams = req.body.ano;
      db.query(fixsql, fixSqlParams, result => {
        result[0].identity = "管理员";
        req.session.user = result[0];

        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    });
  } else {
    let updatasql = "UPDATE t_student SET sname = ?,pwd=? WHERE sno = ?";
    let updataSqlParams = [req.body.name, req.body.password, req.body.ano];

    db.query(updatasql, updataSqlParams, (err, results) => {
      if (err) {
        console.log(err);
      }

      fixsql = "SELECT * FROM t_student WHERE sno = ?";
      fixSqlParams = req.body.ano;
      db.query(fixsql, fixSqlParams, result => {
        result[0].identity = "学生";
        req.session.user = result[0];

        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    });
  }
});

router.get("/showtable", function(req, res, next) {
  db.query("select * from t_admin", [], function(result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});

// 取出教师所有数据（分页查询）
router.get("/teacherdata", function(req, res, next) {
  let offset = parseInt(req.query.offset);
  let pagesize = parseInt(req.query.pageSize);

  db.query("select * from t_teacher limit ?,?", [offset, pagesize], function(
    result,
    fields
  ) {
    db.query("select * from t_teacher", [offset, pagesize], function(
      results,
      fields
    ) {
      return res.status(200).json({
        err_code: 0,
        message: "OK",
        result: result,
        total: results.length
      });
    });
  });
});

// 取出老师数据供选课下拉列表使用
router.get("/teacherdataforcourse", function(req, res, next) {
  db.query("select tname from t_teacher", [], function(result, fields) {
    console.log(result);
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});

// 添加教师数据
router.post("/Addteacherdata", function(req, res, next) {
  let body = req.body;

  db.query("select * from t_teacher", [], function(result, fields) {
    let tno = result[result.length - 1].tno + 1;

    let addSql =
      "INSERT INTO t_teacher(tno,loginname,tname,pwd,phone,hiredate,remark,email) VALUES(?,?,?,?,?,?,?,?)";
    let addSqlParams = [
      tno,
      body.username,
      body.name,
      body.password,
      body.contactway,
      body.data,
      body.desc,
      body.mail
    ];
    db.query(addSql, addSqlParams, function(result, fields) {
      console.log("添加成功");
      return res.status(200).json({
        err_code: 0,
        message: "OK"
      });
    });
  });
});

//修改老师数据
router.post("/fixteacherdata", function(req, res, next) {
  console.log(req.body);

  let tno = parseInt(req.body.tno);
  let loginname = req.body.loginname;
  let tname = req.body.tname;
  let pwd = req.body.pwd;
  let phone = req.body.phone;
  let hiredate = req.body.hiredate;
  let remark = req.body.remark;
  let email = req.body.email;

  let updatasql =
    "UPDATE t_teacher SET loginname = ?,tname =?,pwd=?,phone=?,hiredate =?,remark=?,email=? WHERE tno = ?";
  let updataSqlParams = [
    loginname,
    tname,
    pwd,
    phone,
    hiredate,
    remark,
    email,
    tno
  ];
  db.query(updatasql, updataSqlParams, (err, results) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});

//删除教师信息
router.post("/TeacherDelete", function(req, res, next) {
  console.log(req.body);

  let deleteSql = "DELETE FROM t_teacher  WHERE tno = ?";
  let deleteSqlParams = req.body.tno;
  db.query(deleteSql, deleteSqlParams, (err, results) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});

// 取出课程（教师 多表查询 ）所有数据
router.get("/teacherAndCourse", function(req, res, next) {
  let selectsql = "select * from  t_teacher s,t_course c WHERE s.tno = c.tno";

  db.query(selectsql, [], function(result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});

// 添加课程（教师 多表查询 ）数据
router.post("/AddteacherAndCourse", function(req, res, next) {
  console.log(req.body);

  let coursetitle = req.body.coursetitle;
  let credit = req.body.credit;
  let beginsdate = req.body.beginsdate;
  let endsdate = req.body.endsdate;
  let GiveLessonsTeacher = req.body.GiveLessonsTeacher;

  db.query("select * from t_course", [], function(result, fields) {
    let cno = result[result.length - 1].cno + 1;

    let findTeachersql = "SELECT tno FROM t_teacher WHERE tname = ?";
    let findTeacherSqlParams = GiveLessonsTeacher;

    db.query(findTeachersql, findTeacherSqlParams, result => {
      let tno = result[0].tno;

      let addSql =
        "INSERT INTO t_course(cno,cname,credit,startDate,endDate,tno) VALUES(?,?,?,?,?,?)";
      let addSqlParams = [cno, coursetitle, credit, beginsdate, endsdate, tno];

      db.query(addSql, addSqlParams, function(result, fields) {
        console.log("添加成功");

        console.log(result);

        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    });
  });
});

//修改课程（教师 多表查询 ）数据
router.post("/fixteacherAndCoursedata", function(req, res, next) {
  console.log(req.body);

  //课程
  let cno = req.body.cno;
  let cname = req.body.cname;
  let credit = req.body.credit;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  // 教师
  let tname = req.body.tname;

  let fixTeachersql = "SELECT tno,phone FROM t_teacher WHERE tname = ?";
  let fixTeacherSqlParams = tname;

  db.query(fixTeachersql, fixTeacherSqlParams, result => {
    if (result.length > 0) {
      let tno = result[0].tno;
      let phone = result[0].phone;

      let updataCoursesql =
        "UPDATE t_course SET cname=?,credit=?,startDate=?,endDate=?,tno=? WHERE cno = ?";
      let updataCourseSqlParams = [cname, credit, startDate, endDate, tno, cno];

      db.query(updataCoursesql, updataCourseSqlParams, (err, results) => {
        if (err) {
          console.log(err);
        }

        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    } else {
      return res.status(200).json({
        err_code: 1,
        message: "error"
      });
    }
  });
});

//删除课程（教师 多表查询 ）信息
router.post("/teacherAndCoursedataDelete", function(req, res, next) {
  console.log(req.body);

  let deleteSql = "DELETE FROM t_course  WHERE cno = ?";
  let deleteSqlParams = req.body.cno;
  db.query(deleteSql, deleteSqlParams, (err, results) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});

// 取出学生（t_class 多表查询 ）所有数据
router.get("/StudentAndClass", function(req, res, next) {
  let selectsql =
    "select * from  t_student s,t_class c WHERE s.classno = c.classno";
  db.query(selectsql, [], function(result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});

// 根据课程查出所有学生
router.post("/searchStudentformClass", function(req, res, next) {
  console.log(req.body);
  let cno = null;
  if (!req.body.cno) {
    cno = 1;
  } else {
    cno = req.body.cno;
  }

  let selectsql =
    "select * from  t_student s,t_class c WHERE s.classno = c.classno AND s.classno = ?";
  let selectsqlParams = cno;
  db.query(selectsql, selectsqlParams, function(result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });

  // let deleteSql = 'DELETE FROM t_student  WHERE sno = ?';
  // let deleteSqlParams = req.body.sno;
  // db.query(deleteSql, deleteSqlParams, (err, results) => {
  //     if (err) {
  //         console.log(err);
  //     }
  //     return res.status(200).json({
  //         err_code: 0,
  //         message: 'OK'
  //     })
  // })
});

// 添加学生（t_class 多表查询 ）数据
router.post("/AddStudentAndClass", function(req, res, next) {
  console.log(req.body);

  let NameOfstudent = req.body.NameOfstudent;
  let PwdOfstudent = req.body.PwdOfstudent;
  let ContactMethod = req.body.ContactMethod;
  let DateOfBirth = req.body.DateOfBirth;
  let gender = req.body.gender;

  let ClassAndGrade = req.body.ClassAndGrade;
  let desc = req.body.desc;
  let mail = req.body.mail;

  db.query("select * from t_student", [], function(result, fields) {
    //学生编号
    let sno = result[result.length - 1].sno + 1;

    let findClasstsql = "SELECT classno FROM t_class WHERE cname = ?";
    let findClassSqlParams = ClassAndGrade;

    db.query(findClasstsql, findClassSqlParams, result => {
      let classno = result[0].classno;

      let addStudentSql =
        "INSERT INTO t_student(sno,pwd,sname,phone,gender,birth,classno,remark,email) VALUES(?,?,?,?,?,?,?,?,?)";
      let addStudentSqlParams = [
        sno,
        PwdOfstudent,
        NameOfstudent,
        ContactMethod,
        gender,
        DateOfBirth,
        classno,
        desc,
        mail
      ];

      db.query(addStudentSql, addStudentSqlParams, function(result, fields) {
        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    });
  });
});

//修改学生（class 多表查询 ）数据
router.post("/fixstudentAndclassdata", function(req, res, next) {
  console.log(req.body);

  //Student
  let sno = req.body.sno;
  let pwd = req.body.pwd;
  let sname = req.body.sname;
  let gender = req.body.gender;
  let birth = req.body.birth;
  let phone = req.body.phone;
  let remark = req.body.remark;
  let email = req.body.email;

  // class
  let cname = req.body.cname;

  let fixStudentsql = "SELECT classroom,classno FROM t_class WHERE cname = ?";
  let fixStuentSqlParams = cname;

  db.query(fixStudentsql, fixStuentSqlParams, result => {
    if (result.length > 0) {
      console.log(result);

      let classroom = result[0].classroom;
      let classno = result[0].classno;

      let updataCoursesql =
        "UPDATE t_student SET pwd=?,sname=?,phone=?,gender=?,birth=?,classno=?,remark=?,email=? WHERE sno = ?";
      let updataCourseSqlParams = [
        pwd,
        sname,
        phone,
        gender,
        birth,
        classno,
        remark,
        email,
        sno
      ];

      db.query(updataCoursesql, updataCourseSqlParams, (err, results) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).json({
          err_code: 0,
          message: "OK"
        });
      });
    } else {
      return res.status(200).json({
        err_code: 1,
        message: "error"
      });
    }
  });
});

//删除student（class 多表查询 ）信息
router.post("/studentAndclassdataDelete", function(req, res, next) {
  let deleteSql = "DELETE FROM t_student  WHERE sno = ?";
  let deleteSqlParams = req.body.sno;
  db.query(deleteSql, deleteSqlParams, (err, results) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});

//教师 -  查询自己的课程

router.get("/TeacherFindCourse", function(req, res, next) {
  // console.log(req.session.user)
  //
  // let loginname = req.session.user.loginname

  let loginname = "马超";

  TeacherFindCoursesql =
    "SELECT * FROM t_teacher ,t_course \n" +
    "WHERE t_teacher.tno = t_course.tno \n" +
    "AND t_teacher.tname = ?";
  TeacherFindCourseSqlParams = loginname;

  db.query(TeacherFindCoursesql, TeacherFindCourseSqlParams, result => {
    // console.log(result)

    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});

//学生可选课程

router.get("/Studentoptionalcourses", function(req, res, next) {
  let sno = req.session.user.sno;
  let selectsql1 = "select * from  t_student_course t WHERE t.sno = ?";
  db.query(selectsql1, [sno], function(result, fields) {
    let cnoarr = [];
    result.forEach(function(value) {
      cnoarr.push(value.cno);
    });
    let selectsql = "select * from  t_course c,t_teacher t WHERE c.tno = t.tno";
    db.query(selectsql, [], function(result, fields) {
      let newresult = [];
      result.forEach(function(value) {
        if (cnoarr.indexOf(value.cno) < 0) {
          newresult.push(value);
        }
      });
      return res.status(200).json({
        err_code: 0,
        message: "OK",
        result: newresult
      });
    });
  });
});

//提交学生可选课程
router.post("/StudentAddCourse", function(req, res, next) {
  console.log(req.body.selectarr);

  let sno = parseInt(req.session.user.sno);
  let length = req.body.selectarr.length;
  let newarr = [];
  for (let i = 0; i < length; i++) {
    let startcno = parseInt(req.body.selectarr[i].cno);
    newarr.push([sno, startcno]);
  }

  let addSql = "INSERT INTO t_student_course(sno,cno) VALUES ?";
  db.query(addSql, [newarr], function(result, fields) {
    console.log("添加成功");
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});

//学生已选课程 ---
router.get("/Studentalreadyoptionalcourses", function(req, res, next) {
  let sno = req.session.user.sno;
  let selectsql =
    "select * from  t_student_course s,t_course c,t_teacher t WHERE s.cno = c.cno And c.tno = t.tno AND s.sno = ?";
  db.query(selectsql, [sno], function(result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});

// 学生删除选课
router.post("/selectCourseDelete", function(req, res, next) {
  let deleteSql = "DELETE FROM t_student_course  WHERE cno = ? AND sno=?";
  let deleteSqlParams = [req.body.cno, req.body.sno];

  db.query(deleteSql, deleteSqlParams, (err, results) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});

module.exports = router;
