using _888InterviewProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _888InterviewProject.DataStorage
{
    public class DataManager
    {
        private static readonly List<UserModel> Users = new List<UserModel>()
        {
            new UserModel { Id = 1, UserName = "danieldinca", FirstName = "Daniel", LastName = "Dinca", DateOfBirth = new DateTime(1991,2,5) },
            new UserModel { Id = 2, UserName = "johnpapa", FirstName = "John", LastName = "Papa", DateOfBirth = new DateTime(1987,8,15) },
            new UserModel { Id = 3, UserName = "bradgreen", FirstName = "Brad", LastName = "Green", DateOfBirth = new DateTime(1975,12,3) },
            new UserModel { Id = 4, UserName = "martinfowler", FirstName = "Martin", LastName = "Fowler", DateOfBirth = new DateTime(1983,4,14) }
        };

        public static UserModel GetUser(int userId)
        {
            return Users.Where(user => user.Id == userId).FirstOrDefault();
        }
    }
}
