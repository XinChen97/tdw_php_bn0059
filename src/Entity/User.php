<?php

/**
 * PHP version 7.4
 * src/Entity/User.php
 */

namespace TDW\ACiencia\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use OutOfRangeException;
use DateTime;

/**
 * @ORM\Entity()
 * @ORM\Table(
 *     name                 = "user",
 *     uniqueConstraints    = {
 *          @ORM\UniqueConstraint(
 *              name="IDX_UNIQ_USERNAME", columns={ "username" }
 *          ),
 *          @ORM\UniqueConstraint(
 *              name="IDX_UNIQ_EMAIL", columns={ "email" }
 *          )
 *      }
 *     )
 */
class User implements JsonSerializable
{
    /**
     * @ORM\Column(
     *     name="id",
     *     type="integer",
     *     nullable=false
     *     )
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected int $id;

    /**
     * @ORM\Column(
     *     name     = "username",
     *     type     = "string",
     *     length   = 32,
     *     unique   = true,
     *     nullable = false
     *     )
     */
    private string $username;

    /**
     * @ORM\Column(
     *     name     = "email",
     *     type     = "string",
     *     length   = 60,
     *     nullable = false,
     *     unique   = true
     *     )
     */
    private string $email;

    /**
     * @ORM\Column(
     *     name     = "password",
     *     type     = "string",
     *     length   = 60,
     *     nullable = false
     *     )
     */
    private string $password;

    /**
     * @ORM\Column(
     *     name="role",
     *     type="object"
     *     )
     */
    private Role $role;

    /**
     * @ORM\Column(
     *     name="active",
     *     type="boolean",
     *     nullable=false)
     */
    private bool $active;

    /**
     * @ORM\Column(
     *     name="firstname",
     *     type="string",
     *     length   = 60,
     *     nullable=true)
     */
    private ?string $firstname;

    /**
     * @ORM\Column(
     *     name="lastname",
     *     type="string",
     *     length   = 120,
     *     nullable=true)
     */
    private ?string $lastname;

    /**
     * @ORM\Column(
     *     name="birthdate",
     *     type="datetime",
     *     nullable=true
     *     )
     */
    protected ?DateTime $birthDate = null;

    /**
     * User constructor.
     *
     * @param string $username username
     * @param string $email email
     * @param string $password password
     * @param string $role Role::ROLE_READER | Role::ROLE_WRITER
     * @param bool $active active
     * @param string|null $firstname firstname
     * @param string|null $lastname lastname
     * @param DateTime|null $birthDate birthDate
     */



    public function __construct(
        string $username = '',
        string $email = '',
        string $password = '',
        string $role = Role::ROLE_READER,
        bool $active = false,
        ?string $firstname = null,
        ?string $lastname = null,
        ?DateTime $birthDate = null
    ) {
        $this->id       = 0;
        $this->username = $username;
        $this->email    = $email;
        $this->setPassword($password);
        $this->role     = new Role($role);
        $this->active = $active;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->birthDate = $birthDate;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * Set username
     *
     * @param string $username username
     * @return User
     */
    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email email
     * @return User
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @param string $role
     * @return boolean
     */
    public function hasRole(string $role): bool
    {
        return $this->role->hasRole($role);
    }

    /**
     * @param string $role [ 'ROLE_READER' | 'ROLE_WRITER' ]
     * @throws OutOfRangeException
     * @return User
     */
    public function setRole(string $role): self
    {
        $this->role = new Role($role);
        return $this;
    }

    /**
     * @return array ['reader'] | ['reader', 'writer']
     */
    public function getRoles(): array
    {
        $roles = array_filter(
            Role::ROLES,
            fn($myRole) => $this->hasRole($myRole)
        );

        return $roles;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password password
     * @return User
     */
    public function setPassword(string $password): self
    {
        $this->password = (string) password_hash($password, PASSWORD_DEFAULT);
        return $this;
    }

    /**
     * Verifies that the given hash matches the user password.
     *
     * @param string $password password
     * @return boolean
     */
    public function validatePassword($password): bool
    {
        return password_verify($password, $this->password);
    }


    /**
     * Get activeUser
     *
     * @return boolean
     */
    public function getActive(): bool
    {
        return $this->active;
    }

    /**
     * Set activeuser
     *
     * @param bool $active active
     * @return User
     */
    public function setActive(bool $active): self
    {
        $this->active= $active;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    /**
     * @param string|null $lastname
     * @return User
     */
    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    /**
     * @param string|null $lastname
     * @return User
     */
    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;
        return $this;
    }

    /**
     * @return DateTime|null
     */
    public function getBirthDate(): ?DateTime
    {
        return $this->birthDate;
    }

    /**
     * @param DateTime|null $birthDate
     * @return User
     */
    final public function setBirthDate(?DateTime $birthDate): self
    {
        $this->birthDate = $birthDate;
        return $this;
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString(): string
    {
        $birthDate = (null !== $this->getBirthDate())
            ? $this->getBirthDate()->format('"Y-m-d"')
            : '"null"';
        return '[' . basename(get_class($this)) . ' ' .
            '(id=' . $this->getId() . ', ' .
            'username="' . $this->getUsername() . '", ' .
            'email="' . $this->getEmail() . '", ' .
            'role="' . $this->role . '", ' .
            'active=' . $this->active . '", ' .
            'firstname=' . $this->firstname . '", ' .
            'lastname=' . $this->lastname . '", ' .
            'birthdate' . $birthDate .
            '")]';
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return [
            'user' => [
                'id' => $this->getId(),
                'username' => $this->getUsername(),
                'email' => $this->getEmail(),
                'role' => $this->role->__toString(),
                'active' => $this->getActive(),
                'firstname'=> $this->getFirstname(),
                'lastname' => $this->getLastname(),
                'birthDate' => ($this->getBirthDate()) ? $this->getBirthDate()->format('Y-m-d') : null,
            ]
        ];
    }
}
