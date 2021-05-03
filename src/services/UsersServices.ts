import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepositories";

class UsersServices {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    // Verificar se usuario existe

    const userExists = await this.usersRepository.findOne({
      email,
    });

    // Se existir, retornar user
    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    // Se não existir, salvar no DB
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    return user;
  }
}

export { UsersServices };
