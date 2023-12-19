using Xunit.Abstractions;

namespace AdventOfCode2023.Tests.Day08Part02;

public class Day08Part02
{
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly string _currentDirectory;

    public Day08Part02(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
        _currentDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Tests", "Day08Part02");
    }

    private static string SolverFunction(string rawInput)
    {
        var lines = rawInput.Split("\n");
        throw new NotImplementedException();
    }

    [Fact]
    public void Solve()
    {
        TestUtils.RunAndVerify(SolverFunction, _currentDirectory);
        TestUtils.RunAndRecord(SolverFunction, _currentDirectory, _testOutputHelper);
    }
}